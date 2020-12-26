const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
  about: {
    // profilePicture: String,
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
  loginDetails: {
    emailAddress: String,
    username: String,
    password: String
  },
  producePortfolio: { type: Array, default: [] },
  programsParticipated: { type: Array, default: [] },
});

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Farmer', farmerSchema);