const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    emailAddress: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  producePortfolio: { type: Array, default: [] },
  programsParticipated: { type: Array, default: [] },
});

farmerSchema.plugin(uniqueValidator);

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Farmer', farmerSchema);