const express = require('express');
const router = express.Router();

// Controller
const NGOController = require('../controllers/ngo');

// Model
const NGO = require('../models/NGO');

router.get('/', (req, res) => {
  res.send('Welcome to NGO\'s Dashboard');
})

// ====== CREATE ====== //
router.post('/create', NGOController.createNGO)

// ======= READ ======= //
router.get('/all', NGOController.viewAllNGO)

router.get('/:ngoId', NGOController.viewNGO)

// ====== UPDATE ====== //


// ====== DELETE ====== //


module.exports = router;