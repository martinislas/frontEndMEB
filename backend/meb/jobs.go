package meb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/julienschmidt/httprouter"
	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

type Job struct {
	ID          int64     `json:"id" datastore:"-"`
	Name        string    `json:"name" datastore:"name"`
	Description string    `json:"description" datastore:"description,noindex"`
	Salary      string    `json:"salary" datastore:"salary"`
	Location    string    `json:"location" datastore:"location"`
	Industry    string    `json:"industry" datastore:"industry"`
	Created     time.Time `datastore:"created,noindex"`
	Updated     time.Time `datastore:"updated,noindex"`
}

func getJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := appengine.NewContext(r)

	limit := 10
	query := datastore.NewQuery("job").Limit(limit)

	jobs := make([]*Job, limit)
	keys, err := query.GetAll(ctx, &jobs)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	fmt.Println(keys)

	for i, key := range keys {
		jobs[i].ID = key.IntID()
	}
	fmt.Println(jobs)

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
	ctx := appengine.NewContext(r)

	job := Job{
		Name:        "job",
		Description: "description",
		Salary:      "a lot",
		Location:    "at the beach",
		Industry:    "relax",
		Created:     time.Now(),
		Updated:     time.Now(),
	}

	key := datastore.NewIncompleteKey(ctx, "job", nil)
	key, err := datastore.Put(ctx, key, &job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	fmt.Println(key)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func getJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := appengine.NewContext(r)

	key := datastore.NewKey(ctx, "job", ps.ByName("id"), 0, nil)
	job := new(Job)
	err := datastore.Get(ctx, key, job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	fmt.Println(job)

	jobResp, err := json.Marshal(&job)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobResp)
}
