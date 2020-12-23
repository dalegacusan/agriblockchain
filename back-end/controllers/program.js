const Program = require('../models/Program');
const NGO = require('../models/NGO');

const viewAllPrograms = (req, res, next) => {
  Program.find({})
    .then(data => {
      res.status(200).json({
        message: 'Successfully retrieved all programs.',
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failed to retrieve all programs.'
      });

      next(err);
    });
}

const viewProgram = (req, res, next) => {
  const { programId } = req.params;

  Program.findById(programId)
    .then(data => {
      res.status(200).json({
        message: `Successfully retrieved program ${programId}.`,
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: `Failed to retrieve program ${programId}.`
      });

      next(err);
    })
}

const createProgram = (req, res, next) => {
  const {
    programName,        // from User
    about,              // from User
    cityAddress,        // from User
    ngo,                // REQUIRED
    requiredAmount,     // from User 
    programDate         // DEFAULT = new Date()
  } = req.body;

  const newProgram = new Program({
    programAbout: {
      programName,
      about,
      cityAddress,
      ngo,
      requiredAmount,
    },
    timeline: {
      programDate,
    }
  });

  // Save new program to the database
  newProgram.save()
    .then(result => {
      const { id } = result;
      console.log(`Successfully saved Program ${programName} to the database.`);

      // Object that gets pushed to NGO's active programs array
      const programToPush = {
        programId: id,
        programName,
      }

      // Add programToPush object to NGO's active programs array
      NGO.findOneAndUpdate(
        { _id: ngo },
        { $push: { 'programs.activePrograms': programToPush } }
      )
        .then(() => {
          console.log('Successfully added Program to the active programs of NGO.');

          res.status(200).json({
            message: 'Successfully saved NGO\'s new program to the database.'
          });
        })
        .catch((err) => {
          console.log('Error: ', err);

          res.status(400).json({
            message: 'Failed to add program to the active programs of NGO.'
          });

          next(err);
        });

    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: 'Failed to save program to the database.'
      });

      next(err);
    });
}

module.exports = {
  viewAllPrograms,
  viewProgram,
  createProgram
}