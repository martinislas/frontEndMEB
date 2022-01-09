package meb

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"cloud.google.com/go/datastore"
	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
)

var dsClient *datastore.Client
var hmacSampleSecret = "Asecret" // This should come from GCP secret manager

type adminUserContext string
type adminDisplayContext string

var (
	adminUserCtx    = adminUserContext("admin-username")
	adminDisplayCtx = adminDisplayContext("admin-displayname")
)

func withJWTAuth(next httprouter.Handle) httprouter.Handle {
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
				return []byte(hmacSampleSecret), nil
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

		withAdminUserCtx := context.WithValue(r.Context(), adminUserCtx, adminUsername)
		withAdminDisplayCtx := context.WithValue(withAdminUserCtx, adminDisplayCtx, adminDisplayname)

		next(w, r.WithContext(withAdminDisplayCtx), p)
	}
}

func Router(datastoreClient *datastore.Client) http.Handler {
	dsClient = datastoreClient
	mux := httprouter.New()

	mux.GET("/api/jobs", getJobs)
	mux.GET("/api/jobs/:id", getJob)
	mux.POST("/api/jobs", withJWTAuth(postJob))

	mux.POST("/api/admin/new-admin", withJWTAuth(postNewAdminUser))
	mux.POST("/api/admin/login-admin", postLoginAdminUser)

	return mux
}
