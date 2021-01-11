const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const programSchema = new mongoose.Schema({
	balance: { type: Number, default: 0 },
	requiredAmount: Number,
	completed: { type: Boolean, default: false },
	status: { type: String, default: 'active' },
	stage: { type: String, default: 'crowdfunding' },
	about: {
		programName: String,
		programDescription: String,
		addressLine: String,
		ngoUnder: String,
	},
	timeline: {
		// @dev: Remove default once select from calendar is working
		dateCreated: { type: Date, default: new Date() },
		executionDate: { type: Date, default: new Date() },
	},
	produceRequirements: { type: Array, default: [] },
	farmersParticipating: { type: Array, default: [] },
	sponsors: { type: Array, default: [] },
});

programSchema.plugin(uniqueValidator);

programSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Program', programSchema);
