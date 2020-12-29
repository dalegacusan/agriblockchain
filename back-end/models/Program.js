const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const programSchema = new mongoose.Schema({
  balance: { type: Number, default: 0 },
  about: {
    // programPicture: String,
    status: { type: String, default: "active" },
    stage: { type: String, default: "crowdfunding" },
    completed: { type: Boolean, default: false },
    programName: String,
    about: String,
    cityAddress: String,
    ngo: String,
    requiredAmount: Number,
  },
  timeline: {
    // submissionDate: Date,
    // fundingStartDate: Date,
    // fundingEndDate: Date,
    // procurementStartDate: Date,
    // procurementEndDate: Date,
    programDate: { type: Date, default: new Date() }
  },
  produceRequirements: { type: Array, default: [] },
  farmersParticipating: { type: Array, default: [] },
  sponsors: { type: Array, default: [] },
  // sponsorshipOptions: {
  //   minor: {type: Number, default: 0},
  //   major: {type: Number, default: 0}
  // },
});

programSchema.plugin(uniqueValidator);

programSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Program', programSchema);