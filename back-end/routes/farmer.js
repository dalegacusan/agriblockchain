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

// ======= READ ======= //
router.get('/:farmerId/balance')

router.get('/all', FarmerController.viewAllFarmers)

router.get('/:farmerId', FarmerController.viewFarmer)

// ====== UPDATE ====== //
// Is it possible to make this PATCH instead of POST?
router.post('/:farmerId/add/produce', (req, res, next) => {
  const { farmerId } = req.params;
  const { name, price, quantity } = req.body;

  // Object that gets pushed to Farmer's produce portfolio array
  const produceToPush = {
    farmerId,
    name,
    price,
    quantity,
  }

  Farmer.updateOne({ _id: farmerId }, { $push: { producePortfolio: produceToPush } })
    .then(() => {
      console.log('Successfully added produce to farmer\'s produce portfolio.');

      res.status(200).json({
        message: 'Successfully added produce to farmer\'s produce portfolio.',
      })
    })
    .catch(err => {
      console.log("Error: ", err);

      res.status(400).json({
        message: 'Failed to add produce to farmer\'s produce portfolio.'
      });

      next(err);
    })
})

// ====== DELETE ====== //
router.delete('/:farmerId/delete')

module.exports = router;