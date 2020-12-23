const express = require('express');
const router = express.Router();

// Controller
const SponsorController = require('../controllers/sponsor');

// Models
const Sponsor = require('../models/Sponsor');

router.get('/', (req, res) => {
  res.send('Welcome to Sponsor\'s Dashboard');
})

// ====== CREATE ====== //
router.post('/create', SponsorController.createSponsor)

// ======= READ ======= //
router.get('/all', SponsorController.viewAllSponsors)

router.get('/:sponsorId', SponsorController.createSponsor)

// ====== UPDATE ====== //

// ====== DELETE ====== //

module.exports = router;