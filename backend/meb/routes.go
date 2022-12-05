package meb

import (
	"net/http"

	"github.com/OwenJacob/mebresources/meb/admin"
	"github.com/OwenJacob/mebresources/meb/applicant"
	"github.com/OwenJacob/mebresources/meb/job"
	"github.com/OwenJacob/mebresources/meb/middleware"
	"github.com/julienschmidt/httprouter"
)

func Router() http.Handler {
	mux := httprouter.New()

	mux.GET("/api/jobs", job.GetJobs)   // get all active jobs
	mux.GET("/api/job/:id", job.GetJob) // get an existing job

	mux.POST("/api/admin/login", admin.LoginAdmin)                            // admin login
	mux.GET("/api/admins", middleware.WithAdminAuth(admin.GetAdmins))         // get all admins
	mux.GET("/api/admin/:username", middleware.WithAdminAuth(admin.GetAdmin)) // get an existing admin
	mux.PUT("/api/admin", middleware.WithAdminAuth(admin.PutAdmin))           // modify any existing admin
	mux.POST("/api/admin", middleware.WithAdminAuth(admin.PostAdmin))         // new admin

	mux.GET("/api/industries", admin.GetIndustries)                         // get existing industries
	mux.GET("/api/industry/:id", admin.GetIndustry)                         // get an existing industry
	mux.PUT("/api/industry", middleware.WithAdminAuth(admin.PutIndustry))   // modify existing industry
	mux.POST("/api/industry", middleware.WithAdminAuth(admin.PostIndustry)) // new industry

	mux.GET("/api/locations", admin.GetLocations)                           // get existing locations
	mux.GET("/api/location/:id", admin.GetLocation)                         // get an existing location
	mux.PUT("/api/location", middleware.WithAdminAuth(admin.PutLocation))   // modify existing location
	mux.POST("/api/location", middleware.WithAdminAuth(admin.PostLocation)) // new location

	mux.GET("/api/admins/jobs", middleware.WithAdminAuth(admin.GetJobs))   //get all jobs
	mux.GET("/api/admins/job/:id", middleware.WithAdminAuth(admin.GetJob)) // admin can get existing job with applicant ID's
	mux.PUT("/api/admins/job", middleware.WithAdminAuth(admin.PutJob))     // admin can modify existing job
	mux.POST("/api/admins/job", middleware.WithAdminAuth(admin.PostJob))   // admin can create new job

	mux.GET("/api/admins/applicants", middleware.WithAdminAuth(admin.GetApplicants))   // admin can get existing applicants
	mux.GET("/api/admins/applicant/:id", middleware.WithAdminAuth(admin.GetApplicant)) // admin can get an existing applicant
	mux.PUT("/api/admins/applicant", middleware.WithAdminAuth(admin.PutApplicant))     // admin can update an applicant

	mux.POST("/api/applicant/login", applicant.LoginApplicant)     // applicant login
	mux.GET("/api/applicant/existing", applicant.GetExistingCheck) // check if applicant login details are already in use
	mux.POST("/api/applicant/new", applicant.PostNewApplicant)     // create new applicant

	mux.GET("/api/applicant", middleware.WithApplicantAuth(applicant.GetApplicant)) // get the authenticated applicants details
	mux.PUT("/api/applicant", middleware.WithApplicantAuth(applicant.PutApplicant)) // update the authenticated applicants details
	// mux.POST("/api/job/apply", middleware.WithApplicantAuth(applicant.ApplyJob))    // user just needs to assign their ID to a job to apply
	mux.POST("/api/job/apply", applicant.ApplyJob)

	return mux
}
