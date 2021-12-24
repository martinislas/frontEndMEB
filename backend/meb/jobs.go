package meb

import (
	"encoding/json"
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

type NewJobResp struct {
	ID string `json:"id"`
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
	query := datastore.NewQuery("job").Limit(limit)

	var jobs []*Job
	keys, err := dsClient.GetAll(ctx, query, &jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		jobs[i].ID = keyName
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func postJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newJob Job
	err := json.NewDecoder(r.Body).Decode(&newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IncompleteKey("job", nil)
	storedKey, err := dsClient.Put(ctx, key, &newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newJobID := strconv.FormatInt(storedKey.ID, 10)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(NewJobResp{
		ID: newJobID,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func getJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	id, err := strconv.ParseInt(ps.ByName("id"), 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)
	job := new(Job)
	err = dsClient.Get(ctx, key, job)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	job.ID = ps.ByName("id")

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(job)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
