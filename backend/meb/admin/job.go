package admin

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/middleware"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/julienschmidt/httprouter"
)

type NewJobResp struct {
	ID string `json:"id"`
}

func PostJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	adminDisplay := ctx.Value(middleware.AdminDisplayCtx).(string)

	var newJob model.Job
	err := json.NewDecoder(r.Body).Decode(&newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newJob.PostedBy = adminDisplay
	newJob.Active = true
	newJob.Created = time.Now()
	newJob.Updated = time.Now()

	key := datastore.IncompleteKey("job", nil)
	storedKey, err := ds.Client.Put(ctx, key, &newJob)
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

func PutJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	adminDisplay := ctx.Value(middleware.AdminDisplayCtx).(string)

	var newJob model.Job
	err := json.NewDecoder(r.Body).Decode(&newJob)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newJob.PostedBy = adminDisplay
	newJob.Active = true
	newJob.Created = time.Now()
	newJob.Updated = time.Now()

	key := datastore.IncompleteKey("job", nil)
	storedKey, err := ds.Client.Put(ctx, key, &newJob)
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
