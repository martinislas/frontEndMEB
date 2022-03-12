package admin

import (
	"encoding/json"
	"net/http"
	"time"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb/ds"
	"github.com/OwenJacob/mebresources/meb/middleware"
	"github.com/OwenJacob/mebresources/meb/model"
	"github.com/golang-jwt/jwt/v4"
	"github.com/julienschmidt/httprouter"
	"golang.org/x/crypto/bcrypt"
)

var hmacAdminSecret = "Asecret" // This should come from GCP secret manager

// Session is the response of LoginAdmin
type Session struct {
	Token string `json:"token"`
}

func LoginAdmin(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var loginAdmin model.Admin
	err := json.NewDecoder(r.Body).Decode(&loginAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(loginAdmin.Username) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if len(loginAdmin.Password) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	loginAdminKey := datastore.NameKey("admin", loginAdmin.Username, nil)
	err = ds.Client.Get(ctx, loginAdminKey, &loginAdmin)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	if !loginAdmin.IsActive {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	authorised := bcrypt.CompareHashAndPassword(loginAdmin.HashedPassword, []byte(loginAdmin.Password))
	if authorised != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Create a new token object
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username":    loginAdmin.Username,
		"displayname": loginAdmin.FirstName,
		"issued":      time.Now(),
		"expiry":      time.Now().AddDate(0, 1, 0),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(hmacAdminSecret))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session := Session{
		Token: tokenString,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(session)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetAdmin(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	adminUsername := ctx.Value(middleware.AdminUserCtx).(string)
	adminKey := datastore.NameKey("admin", adminUsername, nil)

	admin := new(model.Admin)
	err := ds.Client.Get(ctx, adminKey, admin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Technically impossible to return through the model but best make sure not to return sensitive fields
	admin.Password = ""
	admin.HashedPassword = []byte{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(admin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutAdmin(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateAdmin model.Admin
	err := json.NewDecoder(r.Body).Decode(&updateAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updateAdminKey := datastore.NameKey("admin", updateAdmin.Username, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedAdmin model.Admin
	if err := tx.Get(updateAdminKey, &updatedAdmin); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update admin details here
	updatedAdmin.FirstName = updateAdmin.FirstName
	updatedAdmin.Surname = updateAdmin.Surname
	updatedAdmin.ResetPassword = updateAdmin.ResetPassword
	updatedAdmin.IsActive = updateAdmin.IsActive
	updatedAdmin.Updated = time.Now()

	if _, err := tx.Put(updateAdminKey, &updatedAdmin); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Technically impossible to return through the model but best make sure not to return sensitive fields
	updatedAdmin.Password = ""
	updatedAdmin.HashedPassword = []byte{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PutAdminPassword(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var updateAdmin model.Admin
	err := json.NewDecoder(r.Body).Decode(&updateAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	updateAdminUsername := ctx.Value(middleware.AdminUserCtx).(string)
	if updateAdmin.Username != updateAdminUsername {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}
	updateAdminKey := datastore.NameKey("admin", updateAdminUsername, nil)

	tx, err := ds.Client.NewTransaction(ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	var updatedAdmin model.Admin
	if err := tx.Get(updateAdminKey, &updatedAdmin); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !updatedAdmin.IsActive {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Update admin password here
	updatedAdmin.HashedPassword, err = bcrypt.GenerateFromPassword([]byte(updateAdmin.Password), 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	updatedAdmin.ResetPassword = false
	updatedAdmin.Updated = time.Now()

	if _, err := tx.Put(updateAdminKey, &updatedAdmin); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err := tx.Commit(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Technically impossible to return through the model but best make sure not to return sensitive fields
	updatedAdmin.Password = ""
	updatedAdmin.HashedPassword = []byte{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(updatedAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func PostAdmin(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	var newAdmin model.Admin
	err := json.NewDecoder(r.Body).Decode(&newAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(newAdmin.Password) == 0 {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	newAdmin.HashedPassword, err = bcrypt.GenerateFromPassword([]byte(newAdmin.Password), 10)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	newAdmin.ResetPassword = true
	newAdmin.IsActive = true
	newAdmin.Created = time.Now()
	newAdmin.Updated = time.Now()

	newAdminKey := datastore.NameKey("admin", newAdmin.Username, nil)
	_, err = ds.Client.RunInTransaction(ctx, func(tx *datastore.Transaction) error {
		// We first check that there is no entity stored with the given key.
		var empty model.Admin
		if err := tx.Get(newAdminKey, &empty); err != datastore.ErrNoSuchEntity {
			return err
		}
		// If there was no matching entity, store it now.
		_, err := tx.Put(newAdminKey, &newAdmin)
		return err
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Technically impossible to return through the model but best make sure not to return sensitive fields
	newAdmin.Password = ""
	newAdmin.HashedPassword = []byte{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(newAdmin)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func GetAdmins(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	ctx := r.Context()

	query := datastore.NewQuery("admin")

	var admins []*model.Admin
	_, err := ds.Client.GetAll(ctx, query, &admins)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Technically impossible to return through the model but best make sure not to return sensitive fields
	for _, admin := range admins {
		admin.Password = ""
		admin.HashedPassword = []byte{}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(admins)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
