const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const flatten = require('flat');
const config = require('./utils/config');

const app = express();

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// =================================
//              Models
// =================================
const NGO = require('./models/NGO');
const Sponsor = require('./models/Sponsor');
const Farmer = require('./models/Farmer');
const Program = require('./models/Program');

// Database Setup
mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB:`, error.message)
  });

// Set up routes
require('./routes')(app);

app.get('/', (req, res) => {
  res.send('Hello World');
})

// =================================
//          CREATE Data Only
// =================================

app.post('/api/program/produce/add', (req, res) => {
  // Produce Requirements
  const testProgramRequirementProduce = new produceRequirement({
    taken: false,
    takenByFarmerId: '',
    name: 'Carrots',
    price: 20,
    quantity: 40,
  });

  Program.updateOne({ _id: '5fcde3ec21a5b22940aebeaa' }, { $push: { produceRequirements: testProgramRequirementProduce } })
    .then(() => {
      console.log('Successfully Updated Program Produce Requirements List');
    })
    .catch(err => {
      console.log(err);
    });
})



// ======================================================================== //
// =============================FOR DEMO=================================== //
// ======================================================================== //

app.post('/api/create/sponsor', (req, res) => {

  const {
    name,
    contactNumber,
    representativeName,
    address1,
    address2,
    region,
    city,
    country,
    username,
    password
  } = req.body;

  const newSponsor = new Sponsor({
    loginDetails: {
      username,
      password
    },
    sponsorAbout: {
      corporationName: name,
      addressLine1: address1,
      addressLine2: address2,
      region,
      city,
      country
    },
    contactDetails: {
      authorizedRepresentative: representativeName,
      contactNumber,
    },
    walletBalance: 100000
  });

  newSponsor.save()
    .then(result => {
      console.log('Sponsor Saved to MongoDB!');
      res.status(200).json({
        status: "success",
        data: result
      });
    })
    .catch(err => {
      console.log('Error saving sponsor: ', err);
      res.status(400).json({
        status: "error",
        response: err
      });
    });

})

app.post('/api/program/:programId/sponsor/:sponsorId/add', async (req, res) => {

  const { programId, sponsorId } = req.params;
  const { amountFunded } = req.body;

  let sponsor = await Sponsor.findById({ _id: sponsorId });

  const { sponsorAbout } = sponsor;
  const { corporationName } = sponsorAbout;

  const sponsorToPush = {
    sponsorId,
    corporationName,
    amountFunded,
    dateFunded: new Date(),
  }

  const programToPush = {
    programId,
    amountFunded,
    dateFunded: new Date()
  }

  // Add amountFunded to currentAmount of Program
  // Used in $inc
  const newAmount = {
    programAbout: {
      currentAmount: amountFunded
    }
  }

  Program.findOneAndUpdate(
    { _id: programId },
    {
      $push: { sponsors: sponsorToPush },
      $inc: flatten(newAmount)
    }, { new: true })
    .then((program) => {
      console.log("Successfully added sponsor to Program's Sponsors array");

      // Push programId to sponsoredPrograms array of Sponsor
      Sponsor.findOneAndUpdate(
        { _id: sponsorId },
        {
          $push: { sponsoredPrograms: programToPush },
          $inc: { walletBalance: -amountFunded }
        }
      )
        .then(() => {
          console.log("Added program to sponsoredPrograms array");

          const { programAbout } = program;
          const { currentAmount, requiredAmount } = programAbout;

          /* 
            Check if currentAmount of Program is >= required amount
            IF TRUE, set Program's stage to "procurement"
          */
          if (currentAmount >= requiredAmount) {
            program.programAbout.stage = "procurement"

            program.save()
              .then(() => {
                console.log("Program is now in Procurement Phase!");
              })
          }

          res.status(200).json({
            message: "Succesfully added program to sponsoredPrograms array"
          });

        })
        .catch(err => {
          console.log(err);
        })

    })
    .catch(err => {
      console.error(err);
      res.status(400).json({
        status: "error",
        response: err
      });
    });

})

app.post('/api/programs/:programId/farmer/:farmerId/add', (req, res) => {

  const { programId, farmerId } = req.params;
  const { name, price, quantity } = req.body;

  const expectedAmountToReceive = price * quantity;

  const producePledge = {
    farmerId,
    name,
    price,
    quantity,
    expectedAmountToReceive,
    dateParticipated: new Date(),
  }

  Program.findOneAndUpdate(
    { _id: programId },
    {
      $push: { farmersParticipating: producePledge },
    }, { new: true })
    .then((program) => {
      console.log("Successfully added Farmer to the Program's Farmers Participating array");

      const programToPush = {
        programId,
        name,
        price,
        quantity,
        expectedAmountToReceive,
        dateParticipated: new Date(),
      }

      // Push programId to programsParticipated array of Farmer
      Farmer.updateOne(
        { _id: farmerId },
        { $push: { programsParticipated: programToPush } }
      )
        .then(() => {
          console.log("Added program to programsParticipated array");

          /**
           * 
           * const { programAbout } = program;
           * //const { currentAmount, requiredAmount } = programAbout;

          /* 
            Check if currentAmount of Program is >= required amount
            IF TRUE, set Program's stage to "procurement"
          */

          // if (currentAmount >= requiredAmount) {
          //   program.programAbout.stage = "procurement"

          //    program.save()
          //     .then(() => {
          //        console.log("Program is now in Procurement Phase!");
          //      })
          //  } **/

          res.status(200).json({
            status: "success",
          });

        })
        .catch(err => {
          console.log(err);
        })

    })
    .catch(err => {
      console.error(err);
      res.status(400).json({
        status: "error",
        response: err
      });
    });

})

app.patch('/api/program/:programId/stage/execution', (req, res) => {

  /*
    Todo:

    1) add a received field to each of farmer's programsParticipated
  */

  const { programId } = req.params;

  const newStage = {
    programAbout: {
      stage: "execution"
    }
  }

  Program.findOneAndUpdate(
    { _id: programId },
    { $set: flatten(newStage) },
    { new: true }
  )
    .then(result => {
      console.log("Program is moved to Execution stage");

      const { farmersParticipating } = result;

      farmersParticipating.forEach(async farmer => {
        const { farmerId, expectedAmountToReceive } = farmer;

        // Add amount to farmer wallet
        await Farmer.findOneAndUpdate(
          { _id: farmerId },
          { $inc: { walletBalance: expectedAmountToReceive } }
        )
          .then(async result => {

            res.status(200).json({
              message: "Successfully updated farmer balance"
            })

          })
          .catch(err => {
            console.log(err);
          });

      })
    })
    .catch(err => {
      console.log(err);
    });
})

// ======================================================================== //
// =============================FOR DEMO=================================== //
// ======================================================================== //

// ****************************************************************************************
app.post('/api/farmers/:farmerId/produce/add', (req, res) => {

  const { farmerId } = req.params;
  const { name, price, quantity } = req.body;

  const produceToPush = {
    farmerId,
    name,
    price,
    quantity,
  }

  Farmer.updateOne({ _id: farmerId }, { $push: { producePortfolio: produceToPush } })
    .then(() => {
      console.log('Successfully Updated Farmer Produce List');
    })
    .catch(err => {
      console.log(err);
    })

})

// =================================
//          READ Data Only
// =================================

// Get all NGOs
app.get('/api/ngo', (req, res) => {
  NGO.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

// Get one NGO
app.get('/api/ngo/:ngoId', (req, res) => {
  const { ngoId } = req.params;

  NGO.findById({ _id: ngoId })
    .then(result => {
      res.status(200).json(result);
    });
})

// Get all programs
app.get('/api/programs', (req, res) => {
  Program.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .then(err => {
      console.log(err);
    });
})

// Get one program
app.get('/api/programs/:programId', (req, res) => {
  const { programId } = req.params;

  Program.findOne({ _id: programId })
    .then(result => {
      res.status(200).json(result);
    });
})

// Get all sponsors
app.get('/api/sponsors', (req, res) => {
  // Get all farmers from MongoDB
  Sponsor.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

// Get one sponsor
app.get('/api/sponsors/:sponsorId', (req, res) => {
  const { sponsorId } = req.params;

  Sponsor.findById({ _id: sponsorId })
    .then(result => {
      res.status(200).json(result);
    });
})

// =================================
//          UPDATE Data Only
// =================================

// Update Basic Program Information
app.patch('/api/programs/:programId', (req, res) => {
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
    .then(res => {
      console.log("Successfully updated");
    })
    .catch(err => {
      console.log(err);
    })

})

// =================================
//          DELETE Data Only
// =================================

app.delete('/api/programs/:programId', (req, res) => {
  const { programId } = req.params;

  Program.deleteOne({ _id: programId })
    .then(result => {
      console.log(`Program ${programId}: deleted from MongoDB`);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    })
    // if failed, print error message
    .catch(err => {
      console.log('Error: ', err);
      res.status(400).json(err);
    })
})

app.delete('/api/sponsors/:sponsorId', (req, res) => {
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

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
})
