const express = require('express');
const router = express.Router();

// Controller
const ProgramController = require('../controllers/program');

// Models
const Program = require('../models/Program');

router.get('/', (req, res) => {
  res.send('Welcome to Program\'s Dashboard');
})

// ====== CREATE ====== //
router.post('/create', ProgramController.createProgram)

// ======= READ ======= //

// ====== UPDATE ====== //

// ====== DELETE ====== //

module.exports = router;