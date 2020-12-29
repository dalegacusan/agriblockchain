const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ngoSchema = new mongoose.Schema({
  about: {
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
  },
  loginDetails: {
    emailAddress: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
});

ngoSchema.plugin(uniqueValidator);

ngoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('NGO', ngoSchema);