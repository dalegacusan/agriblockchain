require('dotenv').config();
const express = require('express');
// Responsible to get the body off of network requests.
const bodyParser = require('body-parser');
const cors = require('cors');
const Farmer = require('./models/Farmer');

// Create an express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/api/farmers', (req, res) => {
  // Get all farmers from MongoDB
  Farmer.find({})
    .then(result => {
      res.json(result);
    });
})

app.post('api/farmers', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})