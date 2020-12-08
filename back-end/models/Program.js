const mongoose = require('mongoose');
const NGO = require('./NGO').schema;
const { produceSchema, produceRequirement } = require('./Produce');
const Farmer = require('./Farmer').schema;
const Sponsor = require('./Sponsor').schema;

const programSchema = new mongoose.Schema({
  programAbout: {
    // programPicture: String,
    programName: String,
    about: String,
    completed: Boolean,
    cityAddress: String,
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: [true, 'A program must have an NGO'] },
    status: String,
    stage: String,
    // FundingMeter and FundingStatus will be based off of these two properties
    requiredAmount: Number,
    currentAmount: Number,
  },
  timeline: {
    // submissionDate: Date,
    // fundingStartDate: Date,
    // fundingEndDate: Date,
    // procurementStartDate: Date,
    // procurementEndDate: Date,
    programDate: Date
  },
  // Create a Requirement Schema
  produceRequirements: [produceRequirement.schema],
  farmersParticipating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }],
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  sponsorshipOptions: {
    minor: Number,
    major: Number
  },
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