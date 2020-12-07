require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Responsible to get the body off of network requests.
const bodyParser = require('body-parser');
const cors = require('cors');
const Farmer = require('./models/Farmer');
const Program = require('./models/Program');
const NGO = require('./models/NGO');

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

app.get('/api/farmers', (req, res) => {
  // Get all farmers from MongoDB
  Farmer.find({})
    .then(result => {
      res.json(result);
    });
})

app.get('/api/ngo', (req, res) => {
  NGO.find({})
    .then(result => {
      res.json(result);
    });
})

app.get('/api/programs', (req, res) => {
  Program.find({})
    .then(result => {
      res.json(result);
    });
})

app.get('/createngo', (req, res) => {
  Program.find({})
    .then(result => {
      const testNGO = new NGO({
        loginDetails: {
          username: "red@cross.com",
          password: "redcrosspassword"
        },
        ngoAbout: {
          ngoPicture: '/assets/img',
          ngoName: "Red Cross",
          addressLine1: "Quezon City",
          addressLine2: "Cavite City",
          ngoRegion: "NCR",
          ngoCity: "Manila",
          ngoCountry: "Philippines",
        },
        ngoContactDetails: {
          authorizedRepresentative: "Dale Gacusan",
          ngoContactNumber: "1234567890",
          ngoEmailAddress: "dale@gmail.com"
        },
        programs: {
          activePrograms: [],
          completedPrograms: [],
        }
      });

      testNGO.save()
        .then(result => {
          console.log('testNGO Saved to MongoDB!');
          mongoose.connection.close();
        })
        .catch(err => {
          console.log("Error: ", err.errors._message);
        });
    });

})

app.get('/createprogram', (req, res) => {
  NGO.find({})
    .then(result => {
      const testProgram = new Program({
        programAbout: {
          programPicture: '/assets/img',
          programName: "Bantay Bata",
          about: "To help children",
          completed: false,
          cityAddress: "Manila, Philippines",
          // For testing purposes
          ngo: result[0],
          status: "Completed",
          stage: "Procurement",
        },
        timeline: {
          submissionDate: '2002-12-09',
          fundingStartDate: '2001-12-09',
          fundingEndDate: '2002-11-09',
          procurementStartDate: '2000-12-09',
          procurementEndDate: '2002-12-02',
          programDate: '2006-12-09',
        },
        // Create a Requirement Schema
        produceRequirements: ['Carrots', 'Potatoes'],
        funding: {
          meter: 60,
          status: 'Php 70,000 of Php 100,000'
        },
        sponsorshipOptions: {
          minor: 50000,
          major: 100000
        },
        // Contains Sponsors Schema
        sponsors: ['Michael Jordan', 'Mark Zuckerberg', 'Bill Gates']
      });

      // Save a farmer to MongoDB
      testProgram.save()
        .then(result => {
          console.log('testProgram Saved to MongoDB!');
          mongoose.connection.close();
        })
        .catch(err => {
          console.log("Error: ", err.errors['programAbout.ngo'].message);
        });
    });

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})