require('dotenv').config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  PORT,
  MONGODB_URL
}