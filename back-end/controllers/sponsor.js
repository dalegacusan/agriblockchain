const Sponsor = require('../models/Sponsor');

const viewAllSponsors = async (req, res, next) => {

  try {
    const allSponsors = await Sponsor.find({});

    res.status(200).json({
      message: 'Successfully retrieved all sponsors.',
      data: allSponsors
    })
  } catch (err) {
    res.status(400).json({
      message: 'Failed to retrieve all sponsors.'
    });

    next(err);
  }

}

const viewSponsor = async (req, res, next) => {
  const { sponsorId } = req.params;

  try {
    const oneSponsor = await Sponsor.findById(sponsorId);

    res.status(200).json({
      message: `Successfully retrieved sponsor.`,
      data: oneSponsor
    })
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve sponsor.`
    });

    next(err);
  }
}

const createSponsor = (req, res, next) => {
  const {
    username,
    password,
    name,
    address1,
    address2,
    representativeName,
    contactNumber,
    region,
    city,
    country,
  } = req.body;

  const newSponsorAccount = new Sponsor({
    about: {
      corporationName: name,
      addressLine1: address1,
      addressLine2: address2,
      region,
      city,
      country
    },
    contactDetails: {
      authorizedRepresentative: representativeName,
      contactNumber,
    },
    loginDetails: {
      username,
      password
    }
  });

  newSponsorAccount.save()
    .then(result => {
      const { about } = result;
      const { corporationName } = about;
      console.log(`Successfully saved Sponsor ${corporationName} to the database.`);

      res.status(200).json({
        message: `Successfully saved Sponsor ${corporationName} to the database.`
      });
    })
    .catch(err => {
      console.log('Error: ', err);

      res.status(400).json({
        message: "Failed to save sponsor to the database."
      });

      next(err);
    });
}

const getBalance = async (req, res, next) => {
  const { sponsorId } = req.params;

  try {
    const sponsor = await Sponsor.findById(sponsorId);
    const { balance } = sponsor;

    res.status(200).json({ balance });
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve balance.`
    });

    next(err);
  }
}

module.exports = {
  viewSponsor,
  viewAllSponsors,
  createSponsor,
  getBalance
}