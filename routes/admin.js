import express from 'express';

const router = express.Router();

export default () => {
  router.get('/', (request, response) => {
    response.send('Admin page');
  });

  return router;
};
