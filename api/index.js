import express from 'express';
import { routerApi } from '../src/routes/index.router.js';
import cors from 'cors';
import { checkApiKey } from '../src/middlewares/auth.handler.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load('./openapi.yaml');

import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} from '../src/middlewares/error.handler.js';

const app = express();
app.use(cookieParser());

app.use(express.json());

const whitelist = [
  'http://127.0.0.1:5500',
  'https://api-e-commerce-livid.vercel.app',
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
import './../src/util/index.js';

app.listen(3000, console.log('Api corriendo en el puerto 3000'));

app.get('/', (req, res) => {
  res.send('Api funcionando de manera exitosa');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
