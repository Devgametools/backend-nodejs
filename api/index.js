const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { config } = require('../api/config/config');

const app = express();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  sqlErrorHandler,
} = require('./middlewares/error.handler');
const { checkApiKey } = require('./middlewares/auth.handler');

const port = config.port || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'http://localhost:3715'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No Allowed'));
    }
  },
};
app.use(cors(options));

require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Hello World, Main page - Server in ExpressJS');
});

app.get('/prueba', checkApiKey, (req, res) => {
  res.send('Welcome to API of Baby Store by Emma');
});

app.get('/api', (req, res) => {
  res.send('Welcome to API of Baby Store by Emma');
});

routerApi(app);

app.use(logErrors);
app.use(sqlErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
