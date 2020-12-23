const express = require('express');
const router = express.Router();

// Controller
const FarmerController = require('../controllers/farmer');

// Models
const Farmer = require('../models/Farmer');

router.get('/', (req, res) => {
  res.send('Welcome to Farmer\'s Dashboard');
})

// ====== CREATE ====== //
router.post('/create', FarmerController.createFarmer)

router.post('/produce/add', (req, res) => {
  res.send('Please wait while we add a new produce to the farmer\'s inventory.')
})

// ======= READ ======= //
router.get('/all', FarmerController.viewAllFarmers)

router.get('/:farmerId', FarmerController.viewFarmer)

// ====== UPDATE ====== //


// ====== DELETE ====== //

module.exports = router;