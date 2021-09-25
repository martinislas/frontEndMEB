package meb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/julienschmidt/httprouter"
)

type Job struct {
	ID          string    `json:"id" datastore:"-"`
	Name        string    `json:"name" datastore:"name"`
	Description string    `json:"description" datastore:"description,noindex"`
	Salary      string    `json:"salary" datastore:"salary"`
	Location    string    `json:"location" datastore:"location"`
	Industry    string    `json:"industry" datastore:"industry"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}

func getJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()
	var err error

	queryLimit := r.URL.Query().Get("limit")
	limit := 5
	if len(queryLimit) != 0 {
		limit, err = strconv.Atoi(queryLimit)
		if err != nil {
			limit = 5
		}
	}
	fmt.Println(limit)
	query := datastore.NewQuery("job").Limit(limit)

	var jobs []*Job
	keys, err := dsClient.GetAll(ctx, query, &jobs)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		jobs[i].ID = keyName
	}

	jobsResp, err := json.Marshal(&jobs)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobsResp)
}

func postJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	job := Job{
		Name:        "job",
		Description: "description",
		Salary:      "a lot",
		Location:    "at the beach",
		Industry:    "relax",
		Created:     time.Now(),
		Updated:     time.Now(),
	}

	key := datastore.IncompleteKey("job", nil)
	_, err := dsClient.Put(ctx, key, &job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	// Return complete key

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func getJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	id, err := strconv.ParseInt(ps.ByName("id"), 10, 64)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	key := datastore.IDKey("job", id, nil)
	job := new(Job)
	err = dsClient.Get(ctx, key, job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	job.ID = ps.ByName("id")

	jobResp, err := json.Marshal(&job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobResp)
}
