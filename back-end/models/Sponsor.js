const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const sponsorSchema = new mongoose.Schema({
	balance: { type: Number, default: 0 },
	loginDetails: {
		username: { type: String, required: true, unique: true },
		emailAddress: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	about: {
		firstName: String,
		lastName: String,
		addressLine1: String,
		addressLine2: String,
		region: String,
		city: String,
		country: String,
		corporationUnder: String,
	},
	contactDetails: {
		contactNumber: String,
		contactEmailAddress: String,
	},
	programDetails: {
		sponsoredPrograms: { type: Array, default: [] },
	},
});

sponsorSchema.plugin(uniqueValidator);

sponsorSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
