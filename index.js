const express = require('express');
const cors = require('cors');
const routerApi = require('./app/routes');
const app = express();
const { logErrors, errorHandler, boomErrorHandler } = require('./app/middlewares/error.handler');

const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'http://localhost:3715'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World, Main page - Server in ExpressJS');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
