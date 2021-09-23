package meb

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func Router() http.Handler {
	mux := httprouter.New()

	mux.GET("/api/jobs", getJobs)
	mux.GET("/api/jobs/:id", getJob)
	mux.POST("/api/jobs", postJob)

	return mux
}
