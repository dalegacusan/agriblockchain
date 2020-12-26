const NGO = require('../models/NGO');

const viewAllNGO = async (req, res, next) => {

  try {
    const allNGO = await NGO.find({});

    res.status(200).json({
      message: 'Successfully retrieved all NGOs.',
      data: allNGO
    })
  } catch (err) {
    res.status(400).json({
      message: 'Failed to retrieve all NGOs.'
    });

    next(err);
  }

}

const viewNGO = async (req, res, next) => {
  const { ngoId } = req.params;

  try {
    const oneNGO = await NGO.findById(ngoId);

    res.status(200).json({
      message: `Successfully retrieved NGO.`,
      data: oneNGO
    })
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve NGO.`
    });

    next(err);
  }
}

// @dev: NGO Details are still hard-coded
const createNGO = (req, res, next) => {
  const newNGOAccount = new NGO({
    about: {
      ngoName: 'Philippine Red Cross',
      addressLine1: 'Mandaluyong City',
      addressLine2: 'Manila City',
      region: 'NCR',
      city: 'Manila',
      country: 'Philippines',
    },
    contactDetails: {
      authorizedRepresentative: 'Michael C. Lopez',
      contactNumber: '845-435-1111',
      emailAddress: 'lopezmichael@gmail.com'
    },
    loginDetails: {
      username: 'red@cross.com',
      password: 'redcrosspassword'
    }
  });

  newNGOAccount.save()
    .then(result => {
      console.log('Successfully saved NGO to the database.');

      res.status(200).json({
        message: "Successfully saved NGO to the database."
      });

    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: "Failed to save NGO to the database."
      });
    });
}

module.exports = {
  viewAllNGO,
  viewNGO,
  createNGO
}