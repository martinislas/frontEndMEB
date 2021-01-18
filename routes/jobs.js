const express = require('express');

const datastore = require('../models/datastore');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.json([{title: 'Job 1'}, {title: 'Job 2'}, {title: 'Job 3'}]);
  });

  router.post('/', (request, response) => {
      return response.json({title: 'New job'});
  });

  return router;
};
