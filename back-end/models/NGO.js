const mongoose = require('mongoose');
const Program = require('./Program').schema;

const ngoSchema = new mongoose.Schema({
  loginDetails: {
    username: String,
    password: String
  },
  ngoAbout: {
    ngoPicture: String,
    ngoName: String,
    addressLine1: String,
    addressLine2: String,
    ngoRegion: String,
    ngoCity: String,
    ngoCountry: String
  },
  ngoContactDetails: {
    authorizedRepresentative: String,
    ngoContactNumber: String,
    ngoEmailAddress: String
  },
  programs: {
    // For active program, just get the latest item on activePrograms array
    activePrograms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Program'}],
    completedPrograms: [{type: mongoose.Schema.Types.ObjectId, ref: 'Program'}]
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