const mongoose = require('mongoose');
const NGO = require('./NGO').schema;

const programSchema = new mongoose.Schema({
  programAbout: {
    programPicture: String,
    programName: String,
    about: String,
    completed: Boolean,
    cityAddress: String,
    ngo: {type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: [true, "A program must have an NGO"]},
    status: String,
    stage: String
  },
  timeline: {
    submissionDate: Date,
    fundingStartDate: Date,
    fundingEndDate: Date,
    procurementStartDate: Date,
    procurementEndDate: Date,
    programDate: Date
  },
  // Create a Requirement Schema
  produceRequirements: [],
  funding: {
    meter: Number,
    status: String
  },
  sponsorshipOptions: {
    minor: Number,
    major: Number
  },
  // Contains Sponsors Schema
  sponsors: Array
});

// const Program = mongoose.model('Program', programSchema);

programSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Program', programSchema);