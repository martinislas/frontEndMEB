package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
)

var hmacApplicantSecret = "applicantSecret" // This should come from GCP secret manager

type ApplicantIDContext string
type ApplicantDisplayContext string

var (
	ApplicantIDCtx      = ApplicantIDContext("applicant-id")
	ApplicantDisplayCtx = ApplicantDisplayContext("applicant-displayname")
)

func WithApplicantAuth(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, p httprouter.Params) {
		authHeader := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		var applicantID, applicantDisplayname string

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
				return []byte(hmacApplicantSecret), nil
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
				applicantID = claims["id"].(string)
				applicantDisplayname = claims["displayname"].(string)
			}
		}

		withApplicantIDCtx := context.WithValue(r.Context(), ApplicantIDCtx, applicantID)
		withApplicantDisplayCtx := context.WithValue(withApplicantIDCtx, ApplicantDisplayCtx, applicantDisplayname)

		next(w, r.WithContext(withApplicantDisplayCtx), p)
	}
}
