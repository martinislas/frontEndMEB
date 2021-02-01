import express from 'express';

const router = express.Router();

export default () => {
  router.get('/', (request, response) => {
    return response.json([{ title: 'Post 1' }, { title: 'Post 2' }, { title: 'Post 3' }]);
  });

  return router;
};
