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
			username: 'centerfordisasterpreparednessfoundation',
			emailAddress: 'centerfdpf@ph.com',
			password: 'alwaysbeready',
		},
		about: {
			ngoName: 'Center for Disaster Preparedness Foundation',
			ngoDescription: 'CDP is known in the Philippines and in the Asia-Pacific Region as one of the pioneers in the field of community-based disaster risk reduction and management (CBDRRM) and climate change adaptation (CCA)',
			addressLine1: 'Quezon City',
			addressLine2: 'Metro Manila',
			region: 'NCR',
			city: 'Manila',
			country: 'Philippines',
		},
		contactDetails: {
			authorizedRepresentative: {
				firstName: 'Judith',
				lastName: 'McCabe',
				representativeContactNumber: '469 7983',
			},
			contactNumber: '479 4898',
			contactEmailAddress: 'centerfdpf@ph.com',
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
