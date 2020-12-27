const Farmer = require('../models/Farmer');

const viewAllFarmers = async (req, res, next) => {

  try {
    const allFarmers = await Farmer.find({});

    res.status(200).json({
      message: 'Successfully retrieved all farmers.',
      data: allFarmers
    })
  } catch (err) {
    res.status(400).json({
      message: 'Failed to retrieve all farmers.'
    });

    next(err);
  }

}

const viewFarmer = async (req, res, next) => {
  const { farmerId } = req.params;

  try {
    const oneFarmer = await Farmer.findById(farmerId);

    res.status(200).json({
      message: `Successfully retrieved farmer.`,
      data: oneFarmer
    })
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve farmer.`
    });

    next(err);
  }
}

// @dev: Farmer Details are still hard-coded
const createFarmer = (req, res, next) => {
  const newFarmerAccount = new Farmer({
    about: {
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
    loginDetails: {
      username: "josephhermano",
      password: "hermanojoseph123"
    }
  });

  newFarmerAccount.save()
    .then(data => {
      const { about } = data;
      const { firstName, lastName } = about;
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

const getBalance = async (req, res, next) => {
  const { farmerId } = req.params;

  try {
    const farmer = await Farmer.findById(farmerId);
    const { balance } = farmer;

    res.status(200).json({ balance });
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve balance.`
    });

    next(err);
  }
}

// @status: in-progress
const addProduce = (req, res, next) => {
  const { farmerId } = req.params;
  const { name, price, quantity } = req.body;

  // Object that gets pushed to Farmer's produce portfolio array
  const produceToPush = {
    farmerId,
    name,
    price,
    quantity,
  }

  Farmer.updateOne({ _id: farmerId }, { $push: { producePortfolio: produceToPush } })
    .then(() => {
      console.log('Successfully added produce to farmer\'s produce portfolio.');

      res.status(200).json({
        message: 'Successfully added produce to farmer\'s produce portfolio.',
      })
    })
    .catch(err => {
      console.log("Error: ", err);

      res.status(400).json({
        message: 'Failed to add produce to farmer\'s produce portfolio.'
      });

      next(err);
    })
}

module.exports = {
  viewFarmer,
  viewAllFarmers,
  createFarmer,
  getBalance,
  addProduce
}