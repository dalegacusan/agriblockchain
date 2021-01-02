const express = require('express');

const router = express.Router();

// Controller
const NGOController = require('../controllers/ngo');

router.get('/', (req, res) => {
  res.send('Welcome to NGO\'s Dashboard');
});

// ====== CREATE ====== //
router.post('/create', NGOController.createNGO);

// ======= READ ======= //
router.get('/all', NGOController.viewAllNGO);

router.get('/:ngoId', NGOController.viewNGO);

// ====== UPDATE ====== //

// ====== DELETE ====== //
router.delete('/:ngoId/delete');

module.exports = router;
