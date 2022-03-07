package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
)

var hmacUserSecret = "Usersecret" // This should come from GCP secret manager

type UserPhoneContext string
type UserNameContext string

var (
	UserPhoneCtx = UserPhoneContext("user-phone")
	UserNameCtx  = UserNameContext("user-name")
)

func WithUserAuth(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		var userphone, username string

		if len(authHeader) != 2 {
			w.WriteHeader(http.StatusUnauthorized)
			return
		} else {
			jwtToken := authHeader[1]

			token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
				// validate the alg is correct
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(hmacUserSecret), nil
			})
			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			if !token.Valid {
				w.WriteHeader(http.StatusUnauthorized)
				return
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				userphone = claims["phone"].(string)
				username = claims["username"].(string)
			}
		}

		withUserPhoneCtx := context.WithValue(r.Context(), UserPhoneCtx, userphone)
		withUserNameCtx := context.WithValue(withUserPhoneCtx, UserNameCtx, username)

		next(w, r.WithContext(withUserNameCtx), p)
	}
}
