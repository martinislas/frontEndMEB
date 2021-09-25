package meb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/julienschmidt/httprouter"
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
	limit := 10
	query := datastore.NewQuery("job").Limit(limit)

	jobs := make([]*Job, limit)
	keys, err := ds.Client.GetAll(ds.Ctx, query, &jobs)
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	fmt.Println(keys)

	for i, key := range keys {
		jobs[i].ID = key.ID
	}
	fmt.Println(jobs)

	jobsResp, _ := json.Marshal(&jobs)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobsResp)
}

func postJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
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
	key, err := ds.Client.Put(ds.Ctx, key, job)
	if err != nil {
		w.Write([]byte(err.Error()))
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(key.Name))
}

func getJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	key := datastore.NameKey("job", ps.ByName("id"), nil)
	job := new(Job)
	err := ds.Client.Get(ds.Ctx, key, job)
	if err != nil {
		w.Write([]byte(err.Error()))
	}
	fmt.Println(job)

	jobResp, _ := json.Marshal(&job)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobResp)
}
