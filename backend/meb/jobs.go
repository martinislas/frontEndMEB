package meb

import (
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/julienschmidt/httprouter"
)

type Job struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description" datastore:",noindex"`
	Salary      string    `json:"salary"`
	Location    string    `json:"location"`
	Industry    string    `json:"industry"`
	Created     time.Time `datastore:",noindex"`
	Updated     time.Time `datastore:",noindex"`
}

func getJobs(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	limit := 10
	query := datastore.NewQuery("job").Limit(limit)

	jobs := make([]*Job, limit)
	keys, _ := ds.Client.GetAll(ds.Ctx, query, &jobs)

	for i, key := range keys {
		jobs[i].ID = key.ID
	}

	jobsResp, _ := json.Marshal(&jobs)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobsResp)
}

func postJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	// try {
	// 	const entity = {
	// 	  key: datastore.key('job'),
	// 	  excludeFromIndexes: ['description', 'created', 'updated'],
	// 	  data: {
	// 		name: request.body.name,
	// 		description: request.body.description,
	// 		salary: request.body.salary,
	// 		location: request.body.location,
	// 		industry: request.body.industry,
	// 		created: new Date(),
	// 		updated: new Date(),
	// 	  },
	// 	};
	// 	await datastore.save(entity, () => {
	// 	  return response.json(entity.key);
	// 	});
	//   } catch (error) {
	// 	return next(error);
	//   }
}

func getJob(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	key := datastore.NameKey("job", ps.ByName("id"), nil)
	job := new(Job)
	ds.Client.Get(ds.Ctx, key, job)
	// Handle an error on Get

	jobResp, _ := json.Marshal(&job)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jobResp)
}
