require('dotenv').config();
const express   = require('express');
const connectDB = require('./src/config/db');
const authRoute     = require('./src/routes/authRoute');
const noteRoute     = require('./src/routes/noteRoute');
const categoryRoute = require('./src/routes/categoryRoute');
const todoRoute     = require('./src/routes/todoRoute');
const errorHandler  = require('./src/middleware/errorHandler');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use('/api/auth',       authRoute);
app.use('/api/notes',      noteRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/todos',      todoRoute); 
app.use(errorHandler);
app.use(cors()); // This allows all origins by default
connectDB().then(() => {
  app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});