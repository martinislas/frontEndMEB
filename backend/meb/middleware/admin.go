package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/OwenJacob/mebresources/meb/secrets"
	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
)

var hmacAdminSecret = "Asecret" // This should come from GCP secret manager

type AdminUserContext string
type AdminDisplayContext string

var (
	AdminUserCtx    = AdminUserContext("admin-username")
	AdminDisplayCtx = AdminDisplayContext("admin-displayname")
)

func WithAdminAuth(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		var adminUsername, adminDisplayname string

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

				adminSecret, err := secrets.GetAdminSecret()
				return adminSecret, err
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
				adminUsername = claims["username"].(string)
				adminDisplayname = claims["displayname"].(string)
			}
		}

		// Get the user and check if they are active or have password reset switch

		withAdminUserCtx := context.WithValue(r.Context(), AdminUserCtx, adminUsername)
		withAdminDisplayCtx := context.WithValue(withAdminUserCtx, AdminDisplayCtx, adminDisplayname)

		next(w, r.WithContext(withAdminDisplayCtx), p)
	}
}
