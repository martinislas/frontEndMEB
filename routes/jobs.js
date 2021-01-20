import express from 'express';

const router = express.Router();

export default params => {
  const { datastore } = params
  router.get('/', async(request, response, next) => {
    try {
      const query = datastore.createQuery('job').order('created', {descending: true});
      const [entities] = await datastore.runQuery(query);
      return response.json(entities);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const entity = {
        key: datastore.key('job'),
        excludeFromIndexes: [
          'description',
          'created',
          'updated',
        ],
        data: {
          name: request.body.name,
          description: request.body.description,
          salary: request.body.salary,
          location: request.body.location,
          industry: request.body.industry,
          created: new Date(),
          updated: new Date(),
        },
      };
      await datastore.save(entity, () => {
        return response.json(entity.key);
      });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
