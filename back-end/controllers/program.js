const Program = require('../models/Program');
const NGO = require('../models/NGO');
const Sponsor = require('../models/Sponsor');

const viewAllPrograms = async (req, res, next) => {

  try {
    const allPrograms = await Program.find({});

    res.status(200).json({
      message: 'Successfully retrieved all programs.',
      data: allPrograms
    })
  } catch (err) {
    res.status(400).json({
      message: 'Failed to retrieve all programs.'
    });

    next(err);
  };

}

const viewProgram = async (req, res, next) => {
  const { programId } = req.params;

  try {
    const oneProgram = await Program.findById(programId);

    res.status(200).json({
      message: `Successfully retrieved program ${programId}.`,
      data: oneProgram
    })
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve program ${programId}.`
    });

    next(err);
  }
}

const createProgram = (req, res, next) => {
  const {
    programName,        // from User
    about,              // from User
    cityAddress,        // from User
    ngo,                // AUTOFILL
    requiredAmount,     // from User 
  } = req.body;

  const newProgram = new Program({
    about: {
      programName,
      about,
      cityAddress,
      ngo,
      requiredAmount,
    }
  });

  // Save new program to the database
  newProgram.save()
    .then(data => {
      const { id } = data;
      console.log(`Successfully saved Program ${programName} to the database.`);

      // Pushed to NGO's [activePrograms] array
      const programToPush = {
        programId: id,
        programName,
      }

      // Add programToPush object to NGO's activePrograms array
      NGO.findByIdAndUpdate(
        ngo,
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

const getBalance = async (req, res, next) => {
  const { programId } = req.params;

  try {
    const program = await Program.findById(programId);
    const { balance } = program;

    res.status(200).json({ balance });
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve balance.`
    });

    next(err);
  }
}

const deleteProgram = async (req, res, next) => {
  const { programId } = req.params;

  // Delete document from the database
  Program.findByIdAndDelete(programId)
    .then(data => {
      const { about } = data;
      const { ngo } = about;

      // Remove from ngo's programs array
      NGO.findByIdAndUpdate(
        ngo,
        { $pull: { 'programs.activePrograms': { programId } } }
      ).then(data => {
        res.status(200).json({
          status: 'Successfully deleted program from the database.',
        });
      }).catch(err => {
        console.log('Error: ', err);

        res.status(400).json({
          message: 'Failed to remove program from NGO\'s active programs.'
        });

        next(err);
      })
    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: 'Failed to delete program.'
      });

      next(err);
    })

}

// @dev: Add restrictions 
// - A sponsor must have sufficient balance
// - A program can't have any more sponsor if NOT crowdfunding phase anymore
const addSponsor = async (req, res, next) => {
  const { programId, sponsorId } = req.params;
  let { amountFunded } = req.body;
  amountFunded = parseInt(amountFunded);

  // Pushed to Sponsor's [sponsoredPrograms] array
  const programToPush = {
    programId,
    amountFunded,
    dateFunded: new Date(),
  }
  // Pushed to Program's [sponsors] array
  const sponsorToPush = {
    sponsorId,
    amountFunded,
    dateFunded: new Date(),
  }

  // Promises to be passed to Promise.all()
  const addProgramToSponsor = Sponsor.findByIdAndUpdate(
    sponsorId,
    {
      $push: { sponsoredPrograms: programToPush },
      $inc: { balance: -amountFunded } // Decrease sponsor balance
    }
  )
  const addSponsorToProgram = Program.findByIdAndUpdate(
    programId,
    {
      $push: { sponsors: sponsorToPush },
      $inc: { balance: amountFunded } // Increase program balance
    },
    { new: true }
  )

  Promise.all([addProgramToSponsor, addSponsorToProgram])
    .then(values => {
      const sponsor = values[0];
      const program = values[1];

      const { balance } = program;
      const { about } = program;
      const { requiredAmount } = about;

      /* 
        Check if current balance of Program is >= required amount
        IF TRUE, set Program's stage to "procurement"
      */
      if (balance >= requiredAmount) {
        program.about.stage = "procurement";

        program.save()
          .then(() => {
            console.log("Program is now in Procurement Phase!");

            res.status(200).json({
              message: 'Program is now in Procurement Phase.'
            });
          })
      } else {
        res.status(200).json({
          message: 'Successfully added sponsor to program.'
        });
      }
    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: 'Something went wrong.'
      });

      next(err);
    });

}

module.exports = {
  viewAllPrograms,
  viewProgram,
  createProgram,
  getBalance,
  deleteProgram,
  addSponsor
}