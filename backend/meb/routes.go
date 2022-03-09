package meb

import (
	"net/http"

	"github.com/OwenJacob/mebresources/meb/admin"
	"github.com/OwenJacob/mebresources/meb/job"
	"github.com/OwenJacob/mebresources/meb/middleware"
	"github.com/julienschmidt/httprouter"
)

func Router() http.Handler {
	mux := httprouter.New()

	mux.GET("/api/jobs", job.GetJobs)             // get all jobs
	mux.GET("/api/jobs/:id", job.GetJob)          // get an existing job
	mux.POST("/api/jobs/:id/apply", job.ApplyJob) // user just needs to assign a phone number to a job to apply

	mux.POST("/api/admin/login", admin.LoginAdminUser)

	mux.GET("/api/admin", middleware.WithAdminAuth(admin.GetAdminUser))                  // get current admin
	mux.PUT("/api/admin", middleware.WithAdminAuth(admin.PutAdminUser))                  // modify any existing admin
	mux.PUT("/api/admin/password", middleware.WithAdminAuth(admin.PutAdminUserPassword)) // update password for authenticated admin
	mux.POST("/api/admin", middleware.WithAdminAuth(admin.PostAdminUser))                // new admin
	mux.GET("/api/admins", middleware.WithAdminAuth(admin.GetAdminUsers))                // get a list of admins

	mux.GET("/api/industries", admin.GetIndustries)                         // get existing industries
	mux.PUT("/api/industry", middleware.WithAdminAuth(admin.PutIndustry))   // modify existing industry
	mux.POST("/api/industry", middleware.WithAdminAuth(admin.PostIndustry)) // new industry

	mux.GET("/api/locations", admin.GetLocations)                           // get existing locations
	mux.PUT("/api/location", middleware.WithAdminAuth(admin.PutLocation))   // modify existing location
	mux.POST("/api/location", middleware.WithAdminAuth(admin.PostLocation)) // new location

	mux.POST("/api/admin/job", middleware.WithAdminAuth(admin.PostJob)) // POST admin/job (new job)
	mux.PUT("/api/admin/job", middleware.WithAdminAuth(admin.PutJob))   // PUT admin/job (modify existing job)
	// GET admin/job/:id/applicants (get applicants by job)
	// GET admin/applicants (get existing applicants)
	// GET admin/applicants/:id (get an existing applicant)
	// POST admin/applicants/:id (add a new applicant)
	// PUT admin/applicants/:id (update an applicant)

	// POST user/login-user
	// GET user/existing (check if it exists - phone)
	// GET user/jobs (user ID?)
	// GET user/profile (existing)
	// POST user/profile (new)
	// PUT user/profile (update)

	return mux
}
