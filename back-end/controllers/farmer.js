const Farmer = require('../models/Farmer');

const viewAllFarmers = (req, res, next) => {
  Farmer.find({})
    .then(data => {
      res.status(200).json({
        message: 'Successfully retrieved all farmers.',
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failed to retrieve all farmers.'
      });

      next(err);
    })
}

const viewFarmer = (req, res, next) => {
  const { farmerId } = req.params;

  Farmer.findById(farmerId)
    .then(data => {
      res.status(200).json({
        message: `Successfully retrieved farmer ${farmerId}.`,
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: `Failed to retrieve farmer ${farmerId}.`
      });

      next(err);
    })
}

// @dev: Farmer Details are still hard-coded
const createFarmer = (req, res, next) => {
  const newFarmerAccount = new Farmer({
    loginDetails: {
      username: "josephhermano",
      password: "hermanojoseph123"
    },
    farmerAbout: {
      firstName: "Joseph",
      middleName: "Sultan",
      lastName: "Hermano",
      suffix: "M",
      addressLine1: "2050 Roane Avenue, Washington MD, Maryland",
      addressLine2: "3274 Ingram Street, Galion, Ohio",
      region: "NCR",
      city: "Manila",
      country: "Philippines",
    },
    contactDetails: {
      emailAddress: "josephhermano@gmail.com",
      contactNumber: "937-538-5148"
    },
  });

  newFarmerAccount.save()
    .then(result => {
      const { farmerAbout } = result;
      const { firstName, lastName } = farmerAbout;
      console.log(`Successfully saved ${firstName} ${lastName} to the database.`);

      res.status(200).json({
        message: `Successfully saved ${firstName} ${lastName} to the database.`
      });
    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: "Failed to save farmer to the database."
      });

      next(err);
    });
}

module.exports = {
  viewFarmer,
  viewAllFarmers,
  createFarmer
}