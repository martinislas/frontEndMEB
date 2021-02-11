import express from 'express';
import adminRoute from './admin.js';
import jobsRoute from './jobs.js';
import postsRoute from './posts.js';
import userRoute from './user.js';

const router = express.Router();

export default (params) => {
  const { datastore } = params;
  router.use('/admin', adminRoute(datastore));
  router.use('/jobs', jobsRoute(datastore));
  router.use('/posts', postsRoute(datastore));
  router.use('/user', userRoute(datastore));

  return router;
};
