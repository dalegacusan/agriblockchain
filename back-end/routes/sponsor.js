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
router.get('/:sponsorId/balance', SponsorController.getBalance)

router.get('/all', SponsorController.viewAllSponsors)

router.get('/:sponsorId', SponsorController.viewSponsor)

router.get('/:sponsorId/getPledge/:programId', SponsorController.getPledge)

// ====== UPDATE ====== //
router.patch('/:sponsorId/revertPledge/:programId')

// ====== DELETE ====== //
router.delete('/:sponsorId/delete', (req, res) => {
  const { sponsorId } = req.params;

  // Find a program with the _id of programId to delete
  Sponsor.deleteOne({ _id: sponsorId })

    // if successful, print Program ID deleted from MongoDB
    .then(result => {
      console.log(`Sponsor ${sponsorId}: deleted from MongoDB`);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    })
    .catch(err => {
      console.log('Error: ', err);
      res.status(400).json(err);
    })
})

module.exports = router;