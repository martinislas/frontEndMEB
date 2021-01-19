const express = require('express');

const datastore = require('../models/datastore');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.json([{title: 'Job 1'}, {title: 'Job 2'}, {title: 'Job 3'}]);
  });

  router.post('/', (request, response) => {
      const entity = {
        key: datastore.key('job'),
        excludeFromIndexes: [
          'description',
          'created',
          'updated',
        ],
        data: {
          name: 'A Job',
          description: 'Job description',
          workingHours: '9-5',
          salary: '$15/hour',
          location: 'job location',
          industry: 'job industry',
          created: new Date(),
          updated: new Date(),
        },
      };
      datastore.insert(entity).then((err, apiResponse) => {
        return response.json(apiResponse);
      });
  });

  return router;
};
