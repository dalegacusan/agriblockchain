const express = require('express');

const router = express.Router();

// Controller
const FarmerController = require('../controllers/farmer');

router.get('/', (req, res) => {
  res.send('Welcome to Farmer\'s Dashboard');
});

// ====== CREATE ====== //
router.post('/create', FarmerController.createFarmer);

// ======= READ ======= //
router.get('/:farmerId/balance', FarmerController.getBalance);

router.get('/all', FarmerController.viewAllFarmers);

router.get('/:farmerId', FarmerController.viewFarmer);

// ====== UPDATE ====== //
router.patch('/:farmerId/add/produce', FarmerController.addProduce);

// ====== DELETE ====== //
router.delete('/:farmerId/delete');

module.exports = router;
