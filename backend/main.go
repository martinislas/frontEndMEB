package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/datastore"
	"github.com/OwenJacob/mebresources/meb"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	ctx := context.Background()

	// Create a datastore client. In a typical application, you would create
	// a single client which is reused for every datastore operation.
	dsClient, err := datastore.NewClient(ctx, "meb-resources")
	if err != nil {
		log.Fatal(err)
	}
	defer dsClient.Close()

	err = http.ListenAndServe(":"+port, meb.Router(dsClient))
	if err != nil {
		log.Fatal(err)
	}
}
