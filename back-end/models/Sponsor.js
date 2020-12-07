const mongoose = require('mongoose');
const Program = require('./Program').schema;

const sponsorIndividualSchema = new mongoose.Schema({
  loginDetails: {
    username: String,
    password: String
  },
  corporationAbout: {
    profilePicture: String,
    firstName: String,
    middleName: String,
    lastName: String,
    suffix: String,
    addressLine1: String,
    addressLine2: String,
    region: String,
    city: String,
    country: String
  },
  contactDetails: {
    contactNumber: String,
    emailAddress: String
  },
  programStatistics: {
    amountFunded: Number,
    dateFunded: Date,
    // For active program, just get the latest item on activePrograms array
    activePrograms: [Program],
    sponsoredPrograms: [Program],
    completedPrograms: [Program],
  },
  walletBalance: Number
});

const sponsorCorporationSchema = new mongoose.Schema({
  loginDetails: {
    username: String,
    password: String
  },
  corporationAbout: {
    profilePicture: String,
    corporationName: String,
    addressLine1: String,
    addressLine2: String,
    region: String,
    city: String,
    country: String
  },
  contactDetails: {
    authorizedRepresentative: String,
    contactNumber: String,
    emailAddress: String
  },
  programStatistics: {
    amountFunded: Number,
    dateFunded: Date,
    // For active program, just get the latest item on activePrograms array
    activePrograms: [Program],
    sponsoredPrograms: [Program],
    completedPrograms: [Program],
  },
  walletBalance: Number
});

sponsorIndividualSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

sponsorCorporationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = {
  sponsorIndividual: mongoose.model('SponsorIndividual', produceSchema),
  sponsorCorporation: mongoose.model('SponsorCorporation', produceRequirementSchema)
};