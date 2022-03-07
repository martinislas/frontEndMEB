package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb"
	"github.com/OwenJacob/mebresources/meb/ds"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx := context.Background()
	var err error

	// Create a datastore client. In a typical application, you would create
	// a single client which is reused for every datastore operation.
	ds.Client, err = datastore.NewClient(ctx, "meb-resources")
	if err != nil {
		log.Fatal(err)
	}
	defer ds.Client.Close()

	err = http.ListenAndServe(":"+port, meb.Router())
	if err != nil {
		log.Fatal(err)
	}
}
