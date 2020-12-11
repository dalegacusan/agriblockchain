require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Responsible to get the body off of network requests.
const bodyParser = require('body-parser');
const cors = require('cors');
const flatten = require('flat')

// =================================
//              Models
// =================================
const Farmer = require('./models/Farmer');
const Program = require('./models/Program');
const NGO = require('./models/NGO');
const { produce, produceRequirement } = require('./models/Produce');
const Sponsor = require('./models/Sponsor');

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB:`, error.message)
  });

// Create an express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
})

// =================================
//          CREATE Data Only
// =================================

app.post('/api/create/ngo', (req, res) => {

  const testNGO = new NGO({
    loginDetails: {
      username: 'red@cross.com',
      password: 'redcrosspassword'
    },
    ngoAbout: {
      ngoPicture: '/assets/img',
      ngoName: 'Red Cross',
      addressLine1: 'Quezon City',
      addressLine2: 'Cavite City',
      ngoRegion: 'NCR',
      ngoCity: 'Manila',
      ngoCountry: 'Philippines',
    },
    ngoContactDetails: {
      authorizedRepresentative: 'Dale Gacusan',
      ngoContactNumber: '1234567890',
      ngoEmailAddress: 'dale@gmail.com'
    },
    programs: {
      activePrograms: [],
      completedPrograms: [],
    }
  });

  testNGO.save()
    .then(result => {
      console.log('testNGO Saved to MongoDB!');
    })
    .catch(err => {
      console.log('Error: ', err.errors._message);
    });

})

app.post('/api/create/program', (req, res) => {

  const {
    programName,        // User
    about,              // User
    completed,          // DEFAULT = false
    cityAddress,        // User
    ngo,                // REQUIRED
    status,             // DEFAULT = "active"
    stage,              // DEFAULT = "crowdfunding"
    requiredAmount,     // User 
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
      // submissionDate: '2002-12-09',
      // fundingStartDate: '2001-12-09',
      // fundingEndDate: '2002-11-09',
      // procurementStartDate: '2000-12-09',
      // procurementEndDate: '2002-12-02',
      programDate: programDate,
    },
    // Create a Requirement Schema
    produceRequirements: [],
    farmersParticipating: [],
    // Contains Sponsors Schema
    sponsors: [],
    // sponsorshipOptions: {},
  });

  // Save a farmer to MongoDB
  newProgram.save()
    .then(result => {
      console.log(`Program ${programName}: Saved to MongoDB!`);
      res.json(result);
    })
    .catch(err => {
      console.log('Error: ', err.errors['programAbout.ngo'].message);
    });


})

app.post('/api/create/farmer', (req, res) => {

  const testFarmer = new Farmer({
    loginDetails: {
      username: 'mangjose',
      password: 'mangjosepassword'
    },
    farmerAbout: {
      profilePicture: '/assets/img',
      firstName: 'Jose',
      middleName: 'El',
      lastName: 'Manalo',
      suffix: 'P',
      addressLine1: 'Cotabato',
      addressLine2: 'Davao',
      region: 'NCR',
      city: 'Cavite',
      country: 'Philippines',
    },
    contactDetails: {
      emailAddress: 'mangjose@gmail.com',
      contactNumber: '1234567890'
    },
    producePortfolio: [],
    programStatistics: {
      expectedAmountToReceive: 0,
      dateParticipated: null,
      // For active program, just get the latest item on activePrograms array
      activePrograms: [],
      programsParticipated: [],
      completedPrograms: []
    }
  });

  testFarmer.save()
    .then(result => {
      console.log('testFarmer Saved to MongoDB!');
    })
    .catch(err => {
      console.log('Error: ', err);
    });

});

app.post('/api/create/sponsor', (req, res) => {

  const newSponsor = new Sponsor({
    loginDetails: {
      username: "johndoe@gmail.com",
      password: "johndoe456"
    },
    sponsorAbout: {
      corporationName: "John Doe",
      addressLine1: "Manila, Philippines",
      addressLine2: "Cavite, Philippines",
      region: "NCR",
      city: "Paranaque",
      country: "Philippines"
    },
    contactDetails: {
      authorizedRepresentative: "Mark Zuckerberg",
      contactNumber: "01234567890",
    },
    // sponsoredPrograms: Array,      // DEFAULT = []
    // walletBalance: Number          // DEFAULT = 0
  });

  newSponsor.save()
    .then(result => {
      console.log('Sponsor Saved to MongoDB!');
    })
    .catch(err => {
      console.log('Error: ', err);
    });

})

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

// ADD a sponsor to a program
app.post('/api/program/:programId/sponsor/:sponsorId/add', (req, res) => {

  const { programId, sponsorId } = req.params;
  const { amountFunded } = req.body;

  const sponsorToPush = {
    sponsorId,
    amountFunded,
    dateFunded: new Date(),
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
      Sponsor.updateOne({ _id: sponsorId }, { $push: { sponsoredPrograms: programId } })
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

        })
        .catch(err => {
          console.log(err);
        })

    })
    .catch(err => {
      console.log(err);
    });

})

// =================================
//          READ Data Only
// =================================

app.get('/api/ngo', (req, res) => {
  NGO.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

app.get('/api/programs', (req, res) => {
  Program.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

// Get an individual program
app.get('/api/program/:programId', (req, res) => {
  const { programId } = req.params;

  Program.findOne({ _id: programId })
    .then(result => {
      res.status(200).json(result);
    });
})

app.get('/api/farmers', (req, res) => {
  // Get all farmers from MongoDB
  Farmer.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

app.get('/api/sponsors', (req, res) => {
  // Get all farmers from MongoDB
  Sponsor.find({})
    .then(result => {
      res.status(200).json(result);
    });
})

// =================================
//          UPDATE Data Only
// =================================

app.patch('/api/programs/:programId', (req, res) => {
  const { programId } = req.params;

  /*
      req.body assumes that the information passed is the same
      as the one with CreateProgram.js

      WITHOUT THE FOLLOWING:
      
      1) ngo
         - The NGO is always a default
      
      2) programDate
         - Will an NGO be able to change the programDate after creation?
  */
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

  // Program.findOne({ _id: programId })
  //   .then((programDocument) => {
  //     programDocument.programAbout.programName = programName;

  //     programDocument.save()
  //       .then(() => { console.log('Success!') });
  //   });

})

// =================================
//          DELETE Data Only
// =================================

//call /api/programs/, get the programId
app.delete('/api/programs/:programId', (req, res) => {
  const { programId } = req.params;

  //Find a program with the _id of programId to delete
  Program.deleteOne({ _id: programId })

    //if successful, print Program Program ID delete from MongoDB
    .then(result => {
      console.log(`Program ${programId}: deleted from MongoDB`);
      res.json(result);
    })
    //if delete op failed, print error message
    .catch(err => {
      console.log('Error: ', err);
    })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
