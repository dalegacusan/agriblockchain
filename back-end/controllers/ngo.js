const NGO = require('../models/NGO');
const logger = require('../utils/logger');

const viewAllNGO = async (req, res, next) => {
	try {
		const allNGO = await NGO.find({});

		res.status(200).json(allNGO);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all NGOs.',
		});

		next(err);
	}
};

const viewNGO = async (req, res, next) => {
	const { ngoId } = req.params;

	try {
		const oneNGO = await NGO.findById(ngoId);

		res.status(200).json(oneNGO);
	} catch (err) {
		res.status(400).json({
			message: ',Failed to retrieve NGO.',
		});

		next(err);
	}
};

// @dev: NGO Details are still hard-coded
const createNGO = (req, res, next) => {
	const newNGOAccount = new NGO({
		loginDetails: {
			username: 'philihuriad',
			emailAddress: 'philihuriad@ph.com',
			password: 'humanrightsadvocated',
		},
		about: {
			ngoName: 'Philippine Alliance of Human Rights Advocates',
			ngoDescription: 'Philippine Alliance of Human Rights Advocates is human rights NGO working with a mission ‘’to develop a strong, progressive, dynamic, and pluralist human rights movement that engages the state to comply with its human rights obligations and non-state actors to fulfill their human rights responsibilities’’.',
			addressLine1: 'Quezon City',
			addressLine2: 'Metro Manila',
			region: 'NCR',
			city: 'Manila',
			country: 'Philippines',
		},
		contactDetails: {
			authorizedRepresentative: {
				firstName: 'Raymond',
				lastName: 'Nickenss',
				representativeContactNumber: '283-54-4490',
			},
			contactNumber: '740-463-3291',
			contactEmailAddress: 'allianceofhumanrightsadvocatesph@gmail.com',
		},
	});

	newNGOAccount.save()
		.then(() => {
			logger.info('Successfully saved NGO to the database.');

			res.status(200).json({
				message: 'Successfully saved NGO to the database.',
			});
		})
		.catch((err) => {
			logger.error('Error: ', err);

			res.status(400).json({
				message: 'Failed to save NGO to the database.',
			});

			next(err);
		});
};

module.exports = {
	viewAllNGO,
	viewNGO,
	createNGO,
};
