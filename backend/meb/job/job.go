package job

import (
	"encoding/json"
	"net/http"
	"strconv"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

func GetJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()
	var err error

	// get jobs by industry
	// get jobs by location
	// get jobs by active
	queryLimit := r.URL.Query().Get("limit")
	limit := 5
	if len(queryLimit) != 0 {
		limit, err = strconv.Atoi(queryLimit)
		if err != nil {
			limit = 5
		}
	}
	query := datastore.NewQuery("job").Limit(limit)

	var jobs []*model.Job
	keys, err := ds.Client.GetAll(ctx, query, &jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for i, key := range keys {
		keyName := strconv.FormatInt(key.ID, 10)
		jobs[i].ID = keyName
		jobs[i].ApplicantCount = len(jobs[i].ApplicantKeys)
		// Don't leak applicant ID's on public endpoint
		jobs[i].ApplicantKeys = []string{}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(jobs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var getJob model.Job
	err := json.NewDecoder(r.Body).Decode(&getJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	id, err := strconv.ParseInt(getJob.ID, 10, 64)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	key := datastore.IDKey("job", id, nil)
	gotJob := new(model.Job)
	err = ds.Client.Get(ctx, key, gotJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	gotJob.ID = getJob.ID
	gotJob.ApplicantCount = len(gotJob.ApplicantKeys)
	// Don't leak applicant ID's on public endpoint
	gotJob.ApplicantKeys = []string{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(gotJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
