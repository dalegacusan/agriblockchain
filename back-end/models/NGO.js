const mongoose = require('mongoose');
const Program = require('./Program').schema;

const ngoSchema = new mongoose.Schema({
  loginDetails: {
    username: String,
    password: String
  },
  ngoAbout: {
    // ngoPicture: String,
    ngoName: String,
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
  programs: {
    // For active program, just get the latest item on activePrograms array
    activePrograms: { type: Array, default: [] },
    completedPrograms: { type: Array, default: [] }
  }
});

// const NGO = mongoose.model('NGO', ngoSchema);

ngoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('NGO', ngoSchema);