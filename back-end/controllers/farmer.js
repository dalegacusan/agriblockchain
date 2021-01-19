const { v4: uuidv4 } = require('uuid');

const Farmer = require('../models/Farmer');
const logger = require('../utils/logger');

const viewAllFarmers = async (req, res, next) => {
	try {
		const allFarmers = await Farmer.find({});

		res.status(200).json(allFarmers);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all farmers.',
		});

		next(err);
	}
};

const viewFarmer = async (req, res, next) => {
	const { farmerId } = req.params;

	try {
		const oneFarmer = await Farmer.findById(farmerId);

		res.status(200).json(oneFarmer);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve farmer.',
		});

		next(err);
	}
};

// @dev: Farmer Details are still hard-coded
const createFarmer = (req, res, next) => {
	const newFarmerAccount = new Farmer({
		about: {
			firstName: 'Claudia',
			lastName: 'Griffin',
			addressLine1: '3358 Jett Lane',
			addressLine2: 'Inglewood, CA 90301',
			region: 'NCR',
			city: 'Quezon',
			country: 'Philippines',
		},
		contactDetails: {
			contactNumber: '5373 8859 4551',
			contactEmailAddress: 'claudiagriffin@armyspy.com',
		},
		loginDetails: {
			username: 'Youdiven63',
			emailAddress: 'claudiagriffin@armyspy.com',
			password: 'thoe5pa6uR3',
		},
	});

	newFarmerAccount.save()
		.then((data) => {
			const { about } = data;
			const { firstName, lastName } = about;
			logger.info(`Successfully saved ${firstName} ${lastName} to the database.`);

			res.status(200).json({
				message: `Successfully saved ${firstName} ${lastName} to the database.`,
			});
		})
		.catch((err) => {
			logger.error('Error: ', err);

			res.status(400).json({
				message: 'Failed to save farmer to the database.',
			});

			next(err);
		});
};

const getBalance = async (req, res, next) => {
	const { farmerId } = req.params;

	try {
		const farmer = await Farmer.findById(farmerId);
		const { balance } = farmer;

		res.status(200).json({ balance });
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve balance.',
		});

		next(err);
	}
};

// @status: in-progress
const addProduce = (req, res, next) => {
	const { farmerId } = req.params;
	const { name, price, quantity } = req.body;

	// Object that gets pushed to Farmer's produce portfolio array
	const produceToPush = {
		farmerId,
		produceId: uuidv4(),
		name,
		price,
		quantity,
	};

	Farmer.updateOne({ _id: farmerId }, { $push: { producePortfolio: produceToPush } })
		.then(() => {
			logger.info('Successfully added produce to farmer\'s produce portfolio.');

			res.status(200).json({
				message: 'Successfully added produce to farmer\'s produce portfolio.',
			});
		})
		.catch((err) => {
			logger.error('Error: ', err);

			res.status(400).json({
				message: 'Failed to add produce to farmer\'s produce portfolio.',
			});

			next(err);
		});
};

module.exports = {
	viewFarmer,
	viewAllFarmers,
	createFarmer,
	getBalance,
	addProduce,
};
