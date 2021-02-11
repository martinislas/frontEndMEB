import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from "url";
import gcloudstore from '@google-cloud/datastore';

import routes from './routes/index.js';

const app = express();
const datastore = new gcloudstore.Datastore();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname,'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes({ datastore }));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build','index.html'));
});

app.use((error, request, response, next) => {
  const err = {
    error: {
      code: error.code || 500,
      message: error.message || 'Internal Server Error',
      status: error.status || 'No Trace',
    },
  };
  response.json(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
