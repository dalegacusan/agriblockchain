const mongoose = require('mongoose');
const { produceRequirement } = require('./Produce');

const programSchema = new mongoose.Schema({
  programAbout: {
    // programPicture: String,
    programName: String,
    about: String,
    completed: { type: Boolean, default: false },
    cityAddress: String,
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: [true, 'A program must have an NGO']},
    status: {type: String, default: "active"},
    stage: {type: String, default: "crowdfunding"},
    // FundingMeter and FundingStatus will be based off of these two properties
    requiredAmount: Number,
    currentAmount: {type: Number, default: 0},
  },
  timeline: {
    // submissionDate: Date,
    // fundingStartDate: Date,
    // fundingEndDate: Date,
    // procurementStartDate: Date,
    // procurementEndDate: Date,
    programDate: Date
  },
  produceRequirements: [produceRequirement.schema],
  farmersParticipating: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }],
  sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sponsor' }],
  // sponsorshipOptions: {
  //   minor: {type: Number, default: 0},
  //   major: {type: Number, default: 0}
  // },
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