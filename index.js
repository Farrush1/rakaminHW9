const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const port = 3000;

const pool = require('./queries.js');
const movies = require('./routes/movies.js');
const users = require('./routes/users.js');

const login = require('./routes/login.js');
const { authentication } = require('./middlewares/auth.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use('/login', login);
app.use(authentication);
app.use('/movies', movies);
app.use('/users', users);

const option = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expresso API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API Application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*js'],
};

// const specs = swaggerJsdoc(option);
app.use(
  '/api-docs',
  swaggerUi.serve
  //   swaggerUi.setup(specs, { explorer: true })
);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
console.log('berjalan');
