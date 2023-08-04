const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const app = express();
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const port = process.env.PORT || 3000 || 3001;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'http://localhost:3715'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No Allowed'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World, Main page - Server in ExpressJS');
})

app.get('/api', (req, res) => {
  res.send('Welcome to API of Baby Store by Emma');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
