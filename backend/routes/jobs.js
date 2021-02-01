import express from 'express';

const router = express.Router();

export default (params) => {
  const { datastore } = params;
  router.get('/', async (request, response, next) => {
    try {
      const query = datastore.createQuery('job').select(['name', 'location', 'industry']);
      const [entities] = await datastore.runQuery(query);
      const data = entities.map((entity) => {
        entity.key = entity[datastore.KEY];
        entity.id = entity[datastore.KEY].id;
        return entity;
      });
      return response.json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', async (request, response, next) => {
    try {
      const entity = {
        key: datastore.key('job'),
        excludeFromIndexes: ['description', 'created', 'updated'],
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
      return next(error);
    }
  });

  router.get('/:id', async (request, response, next) => {
    try {
      const query = datastore
        .createQuery('job')
        .filter('__key__', '=', datastore.key(['job', parseInt(request.params.id)]));
      const [entities] = await datastore.runQuery(query);
      const data = entities[0];
      data.id = entities[0][datastore.KEY].id;
      return response.json(data);
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
