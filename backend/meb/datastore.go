package meb

import (
	"context"

	"cloud.google.com/go/datastore"
)

type DSClient struct {
	Ctx    context.Context
	Client *datastore.Client
}

var ds DSClient

func InitDSClient(ctx context.Context, client *datastore.Client) {
	ds.Ctx = ctx
	ds.Client = client
}
