const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  blockchain: Object,
  sponsorAbout: {
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
  sponsoredPrograms: {type: Array, default: []},
  walletBalance: { type: Number, default: 0 }
});

sponsorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Sponsor', sponsorSchema);