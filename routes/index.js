const express = require('express');
const adminRoute = require('./admin');
const jobsRoute = require('./jobs');
const postsRoute = require('./posts');
const userRoute = require('./user');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.send('Landing page');
  });

  router.use('/admin', adminRoute());
  router.use('/jobs', jobsRoute());
  router.use('/posts', postsRoute());
  router.use('/user', userRoute());

  return router;
};
