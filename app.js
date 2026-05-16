require('dotenv').config();
const express       = require('express');
const connectDB     = require('./src/config/db');
const authRoute     = require('./src/routes/authRoute');
const noteRoute     = require('./src/routes/noteRoute');
const todoRoute     = require('./src/routes/todoRoute');
const errorHandler  = require('./src/middleware/errorHandler');
const cors          = require('cors');
const swaggerJsdoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Note Taking API',
      version: '1.0.0',
      description: 'API documentation for the Note Taking App',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // This is where swagger reads your comments from
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/auth',   authRoute);
app.use('/api/notes',  noteRoute);
app.use('/api/todos',  todoRoute);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
  });
});












// require('dotenv').config();

// const express   = require('express');
// const connectDB = require('./src/config/db');
// const authRoute     = require('./src/routes/authRoute');
// const noteRoute     = require('./src/routes/noteRoute');
// // const categoryRoute = require('./src/routes/categoryRoute');
// const todoRoute     = require('./src/routes/todoRoute');
// const errorHandler  = require('./src/middleware/errorHandler');
// const cors = require('cors');

// const app = express();
// app.use(express.json());

// // cors options to accept all origins
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
// }));

// app.use('/api/auth',       authRoute);
// app.use('/api/notes',      noteRoute);
// // app.use('/api/categories', categoryRoute);
// app.use('/api/todos',      todoRoute); 
// app.use(errorHandler);


// connectDB().then(() => {
//   app.listen(process.env.PORT, '0.0.0.0', () => {
//     console.log(`Server running on port ${process.env.PORT}`);
//   });
// });