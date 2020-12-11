const mongoose = require('mongoose');
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
  producePortfolio: { type: Array, default: [] },
  walletBalance: { type: Number, default: 0 }
});

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Farmer', farmerSchema);