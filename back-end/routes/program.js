const express = require('express');
const router = express.Router();
const flatten = require('flat');

// Controller
const ProgramController = require('../controllers/program');

// Models
const Program = require('../models/Program');

router.get('/', (req, res) => {
  res.send('Welcome to Program\'s Dashboard');
})

// ====== CREATE ====== //
router.post('/create', ProgramController.createProgram)

router.patch('/:programId/add/sponsor/:sponsorId', ProgramController.addSponsor)

router.patch('/:programId/add/farmer/:farmerId')

// ======= READ ======= //
router.get('/:programId/balance', ProgramController.getBalance)

router.get('/all', ProgramController.viewAllPrograms)

router.get('/:programId', ProgramController.viewProgram)

// ====== UPDATE ====== //
// Find a way that all update routes use one mongoose method of updating
/* 
  @dev: Produce Details are still hard-coded
  Is it possible to make this PATCH instead of POST?
*/
router.post('/:programId/add/produce', (req, res, next) => {
  const { programId } = req.params;

  // Produce Requirements
  const produceRequirement = {
    taken: false,
    takenByFarmerId: '',
    name: 'Carrots',
    price: 20,
    quantity: 40,
  };

  Program.updateOne(
    { _id: programId },
    { $push: { produceRequirements: produceRequirement } }
  )
    .then(() => {
      console.log('Successfully added produce to program\'s produce requirements list.');

      res.status(200).json({
        message: 'Successfully added produce to program\'s produce requirements list.',
      })
    })
    .catch(err => {
      console.log("Error: ", err);

      res.status(400).json({
        message: 'Failed to add produce to program\'s produce requirements list.'
      });

      next(err);
    });
})

router.patch('/:programId/update', (req, res, next) => {
  const { programId } = req.params;
  const { programName, about, cityAddress, requiredAmount } = req.body;

  const updatedProgram = {
    programAbout: {
      programName,
      about,
      cityAddress,
      requiredAmount,
    }
  }

  Program.findByIdAndUpdate(
    { _id: programId },
    {
      $set: flatten(updatedProgram)
    },
    { new: true, useFindAndModify: false }
  )
    .then(data => {
      console.log('Successfully updated program details.');

      res.status(200).json({
        message: 'Successfully updated program details.',
      })
    })
    .catch(err => {
      console.log("Error: ", err);

      res.status(400).json({
        message: 'Failed to update program details.'
      });

      next(err);
    })
})

router.patch('/:programId/stage/execution')

router.post('/:programId/transferFunds')

// ====== DELETE ====== //
router.delete('/:programId/delete', ProgramController.deleteProgram)

module.exports = router;