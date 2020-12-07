const mongoose = require('mongoose');
const Program = require('./Program').schema;
const { produce } = require('./Produce');

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
  producePortfolio: [produce.schema],
  // Not sure about this
  programStatistics: {
    expectedAmountToReceive: Number,
    dateParticipated: Date,
    // For active program, just get the latest item on activePrograms array
    activePrograms: [Program],
    programsParticipated: [Program],
    completedPrograms: [Program]
  }
});

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Farmer', farmerSchema);