const Sponsor = require('../models/Sponsor');

const viewAllSponsors = (req, res, next) => {
  Sponsor.find({})
    .then(data => {
      res.status(200).json({
        message: 'Successfully retrieved all sponsors.',
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failed to retrieve all sponsors.'
      });

      next(err);
    })
}

const viewSponsor = (req, res, next) => {
  const { sponsorId } = req.params;

  Sponsor.findById({ _id: sponsorId })
    .then(data => {
      res.status(200).json({
        message: `Successfully retrieved sponsor ${sponsorId}.`,
        data
      })
    })
    .catch(err => {
      res.status(400).json({
        message: `Failed to retrieve sponsor ${sponsorId}.`
      });

      next(err);
    })
}

const createSponsor = (req, res, next) => {
  const {
    username,
    password,
    name,
    contactNumber,
    representativeName,
    address1,
    address2,
    region,
    city,
    country,
  } = req.body;

  const newSponsorAccount = new Sponsor({
    loginDetails: {
      username,
      password
    },
    sponsorAbout: {
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
    }
  });

  newSponsorAccount.save()
    .then(result => {
      const { sponsorAbout } = result;
      const { corporationName } = sponsorAbout;
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

module.exports = {
  viewSponsor,
  viewAllSponsors,
  createSponsor
}