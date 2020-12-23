const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  loginDetails: {
    emailAddress: String,
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
    // Get the latest program from activePrograms to retrieve the active program
    activePrograms: { type: Array, default: [] },
    completedPrograms: { type: Array, default: [] }
  }
});

ngoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('NGO', ngoSchema);