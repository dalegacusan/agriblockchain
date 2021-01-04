const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ngoSchema = new mongoose.Schema({
	loginDetails: {
		username: { type: String, required: true, unique: true },
		emailAddress: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	about: {
		ngoName: String,
		addressLine1: String,
		addressLine2: String,
		region: String,
		city: String,
		country: String,
	},
	contactDetails: {
		authorizedRepresentative: {
			firstName: String,
			lastName: String,
			representativeContactNumber: String,
			representativeEmailAddress: String,
		},
		contactNumber: String,
		contactEmailAddress: String,
	},
	programDetails: {
		// Get the latest program from activePrograms to retrieve the active program
		activePrograms: { type: Array, default: [] },
		completedPrograms: { type: Array, default: [] },
	},
});

ngoSchema.plugin(uniqueValidator);

ngoSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('NGO', ngoSchema);
