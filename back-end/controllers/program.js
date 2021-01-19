const Program = require('../models/Program');
const NGO = require('../models/NGO');
const Sponsor = require('../models/Sponsor');
const Farmer = require('../models/Farmer');
const logger = require('../utils/logger');

const viewAllPrograms = async (req, res, next) => {
	try {
		const allPrograms = await Program.find({});

		res.status(200).json(allPrograms);
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve all programs.',
		});

		next(err);
	}
};

const viewProgram = async (req, res, next) => {
	const { programId } = req.params;

	try {
		const oneProgram = await Program.findById(programId);

		res.status(200).json(oneProgram);
	} catch (err) {
		res.status(400).json({
			message: `Failed to retrieve program ${programId}.`,
		});

		next(err);
	}
};

const createProgram = (req, res, next) => {
	const {
		programName,
		programDescription,
		addressLine,
		ngoUnder, // AUTOFILL
		requiredAmount,
	} = req.body;

	const newProgram = new Program({
		requiredAmount,
		about: {
			programName,
			programDescription,
			addressLine,
			ngoUnder,
		},
	});

	// Save new program to the database
	newProgram.save()
		.then((data) => {
			const { id: programId, about } = data;
			const { ngoUnder: programNGOId } = about;
			logger.info(`Successfully saved Program ${programName} to the database.`);

			console.log(programNGOId);

			// Add Program ID to NGO's activePrograms array
			NGO.findByIdAndUpdate(
				programNGOId,
				{ $push: { 'programDetails.activePrograms': programId } },
			)
				.then(() => {
					logger.info('Successfully added Program to the active programs of NGO.');

					res.status(200).json({
						message: 'Successfully saved NGO\'s new program to the database.',
					});
				})
				.catch((err) => {
					logger.error('Error: ', err);

					res.status(400).json({
						message: 'Failed to add program to the active programs of NGO.',
					});

					next(err);
				});
		})
		.catch((err) => {
			logger.error('Error: ', err);

			res.status(400).json({
				message: 'Failed to save program to the database.',
			});

			next(err);
		});
};

const getBalance = async (req, res, next) => {
	const { programId } = req.params;

	try {
		const program = await Program.findById(programId);
		const { balance } = program;

		res.status(200).json({ balance });
	} catch (err) {
		res.status(400).json({
			message: 'Failed to retrieve balance.',
		});

		next(err);
	}
};

const deleteProgram = async (req, res, next) => {
	const { programId } = req.params;

	// Delete document from the database
	Program.findByIdAndDelete(programId)
		.then((data) => {
			const { about } = data;
			const { ngo } = about;

			// Remove from ngo's programs array
			NGO.findByIdAndUpdate(
				ngo,
				{ $pull: { 'programs.activePrograms': { programId } } },
			).then(() => {
				res.status(200).json({
					status: 'Successfully deleted program from the database.',
				});
			}).catch((err) => {
				logger.error('Error: ', err);

				res.status(400).json({
					message: 'Failed to remove program from NGO\'s active programs.',
				});

				next(err);
			});
		})
		.catch((err) => {
			logger.error('Error: ', err);

			res.status(400).json({
				message: 'Failed to delete program.',
			});

			next(err);
		});
};

// @dev: Add restrictions
// - A sponsor must have sufficient balance
// - A program can't have any more sponsor if NOT crowdfunding phase anymore
const addSponsor = async (req, res, next) => {
	const { programId, sponsorId } = req.params;
	let { amountFunded } = req.body;
	amountFunded = Number(amountFunded);

	try {
		// Get Sponsor and Program Name
		const getSponsor = await Sponsor.findById(sponsorId);
		const { about: sponsorAbout, balance: sponsorBalance } = getSponsor;
		const { firstName: sponsorFirstName, lastName: sponsorLastName } = sponsorAbout;

		const getProgram = await Program.findById(programId);
		const { about: programAbout } = getProgram;
		const { programName } = programAbout;

		// Check if Amount Funded is GREATER THAN current balance
		if (amountFunded > sponsorBalance) {
			logger.error('Error: Insufficient balance');

			res.status(400).json({
				message: 'Insufficient balance.',
			});

			next();
		} else {
			// Pushed to Sponsor's [sponsoredPrograms] array
			const programToPush = {
				programId,
				programName,
				amountFunded,
				dateFunded: new Date(),
			};
			// Pushed to Program's [sponsors] array
			const sponsorToPush = {
				sponsorId,
				sponsorName: `${sponsorFirstName} ${sponsorLastName}`,
				amountFunded,
				dateFunded: new Date(),
			};

			// Promises to be passed to Promise.all()
			const addProgramToSponsor = Sponsor.findByIdAndUpdate(
				sponsorId,
				{
					$push: { 'programDetails.sponsoredPrograms': programToPush },
					$inc: { balance: -amountFunded }, // Decrease sponsor balance
				},
			);
			const addSponsorToProgram = Program.findByIdAndUpdate(
				programId,
				{
					$push: { sponsors: sponsorToPush },
					$inc: { balance: amountFunded }, // Increase program balance
				},
				{ new: true },
			);

			Promise.all([addProgramToSponsor, addSponsorToProgram])
				.then((values) => {
					const program = values[1];

					const { balance, requiredAmount } = program;

					/*
						Check if current balance of Program is >= required amount
						IF TRUE, set Program's stage to "procurement"
					*/
					if (balance >= requiredAmount) {
						program.stage = 'procurement';

						program.save()
							.then(() => {
								logger.info('Program is now in Procurement Phase!');

								res.status(200).json({
									message: 'Program is now in Procurement Phase.',
								});
							});
					} else {
						res.status(200).json({
							message: 'Successfully added sponsor to program.',
						});
					}
				});
		}
	} catch (err) {
		logger.error('Error: ', err);

		res.status(400).json({
			message: 'Something went wrong.',
		});

		next(err);
	}
};

const addFarmer = async (req, res, next) => {
	const { programId, farmerId } = req.params;
	const { name, price, quantity } = req.body;

	try {
		const getFarmer = await Farmer.findById(farmerId);
		const { about: farmerAbout, balance: farmerBalance } = getFarmer;
		const { firstName: farmerFirstName, lastName: farmerLastName } = farmerAbout;

		const getProgram = await Program.findById(programId);
		const { about: programAbout } = getProgram;
		const { programName } = programAbout;

		// Pushed to Farmer's [programsParticipated] array
		const programToPush = {
			programId,
			programName,
			expectedAmountToReceive: price * quantity,
			received: false,
			produce: {
				name,
				price,
				quantity,
			},
			dateOffered: new Date(),
		};
		// Pushed to Program's [farmersParticipating] array
		const farmerToPush = {
			farmerId,
			farmerName: `${farmerFirstName} ${farmerLastName}`,
			expectedAmountToReceive: price * quantity,
			produce: {
				name,
				price,
				quantity,
			},
			dateOffered: new Date(),
		};

		// Promises to be passed to Promise.all()
		const addProgramToFarmer = Farmer.findByIdAndUpdate(
			farmerId,
			{
				$push: { programsParticipated: programToPush },
			},
		);
		const addFarmerToProgram = Program.findByIdAndUpdate(
			programId,
			{
				$push: { farmersParticipating: farmerToPush },
			},
		);

		Promise.all([addProgramToFarmer, addFarmerToProgram])
			.then((data) => {
				logger.info('Successful!');

				res.status(200).json({
					message: 'Successfully added farmer to program',
				});
			})
			.catch((err) => {
				logger.error(err);

				res.status(400).json({
					message: 'Failed to add farmer to program',
				});
			});
	} catch (err) {
		logger.error('Error: ', err);

		res.status(400).json({
			message: 'Something went wrong.',
		});

		next(err);
	}
};

module.exports = {
	viewAllPrograms,
	viewProgram,
	createProgram,
	getBalance,
	deleteProgram,
	addSponsor,
	addFarmer,
};
