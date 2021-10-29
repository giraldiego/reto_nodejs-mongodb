// Load enviroment variables from .env file
require('dotenv').config();

// Creates server app
const express = require('express');
const app = express();

// Add middleware to handle json format
app.use(express.json());

// Database connection
const mongoose = require('mongoose');
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => {
    console.log('Failed to connect:', err.message);
  });

// Add listener for errors in DB Connection
const db = mongoose.connection;
db.on('error', (err) => console.log('Error:', err.message));

// app.get('/', (req, res) => {
//   res.send('Welcome to my express server!');
// });

const candidatesRouter = require('./routes/candidates');
app.use('/api/candidates', candidatesRouter);

// Start listening...
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});
