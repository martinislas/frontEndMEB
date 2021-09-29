package meb

import (
	"net/http"

	"cloud.google.com/go/datastore"
	"github.com/julienschmidt/httprouter"
)

var dsClient *datastore.Client

func Router(datastoreClient *datastore.Client) http.Handler {
	dsClient = datastoreClient
	mux := httprouter.New()

	mux.GET("/api/jobs", getJobs)
	mux.GET("/api/jobs/:id", getJob)
	mux.POST("/api/jobs", postJob)

	mux.POST("/api/admin/new-admin", postNewAdminUser)

	return mux
}
