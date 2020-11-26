const express = require('express');
// Responsible to get the body off of network requests.
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an express app
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})