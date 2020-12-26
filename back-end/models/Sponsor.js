const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
  about: {
    // profilePicture: String,
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
  },
  loginDetails: {
    emailAddress: String,
    username: String,
    password: String
  },
  sponsoredPrograms: { type: Array, default: [] }
});

sponsorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Sponsor', sponsorSchema);