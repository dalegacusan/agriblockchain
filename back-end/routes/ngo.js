const express = require('express');
const router = express.Router();

// Controller
const NGOController = require('../controllers/ngo');

// Model
const NGO = require('../models/NGO');

router.get('/', (req, res) => {
  res.send('Welcome to NGO\'s Dashboard');
})

router.post('/create', NGOController.createNGO)

module.exports = router;