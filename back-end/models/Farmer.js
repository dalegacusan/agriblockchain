const mongoose = require('mongoose');
const Program = require('./Program').schema;

const farmerSchema = new mongoose.Schema({
  loginDetails: {
    username: String,
    password: String
  },
  farmerAbout: {
    profilePicture: String,
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    addressLine1: String,
    addressLine2: String,
    region: String,
    city: String,
    country: String,
  },
  contactDetails: {
    emailAddress: String,
    contactNumber: String
  },
  // Contains Produce Schema
  producePortfolio: Array,
  programStatistics: {
    // For active program, just get the latest item on activePrograms array
    activePrograms: Array,
    programsParticipated: Array,
    completedPrograms: Array
  },
});

/*
  'Farmer' is the collection/table name
  farmerSchema will be the 'blueprint' that the collection will follow
*/
// const Farmer = mongoose.model('Farmer', farmerSchema);

// Create a farmer
// const farmerMangJose = new Farmer({
//   firstName: 'Juan',
//   lastName: 'Jose',
//   location: 'Ilocos Norte',
//   produce: ['Potatoes', 'Tomatoes'],
//   lastOnline: new Date(),
//   preferredModeOfCommunication: 'SMS'
// });

// Save a farmer to MongoDB
// farmerMangJose.save()
//   .then(result => {
//     console.log('Farmer Saved to MongoDB!');
//     mongoose.connection.close();
//   })

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Farmer', farmerSchema);