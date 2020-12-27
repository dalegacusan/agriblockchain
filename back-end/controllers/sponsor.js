const Sponsor = require('../models/Sponsor');
const Program = require('../models/Program');

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
    .then(data => {
      const { about } = data;
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

// @dev: assumes that a sponsor can pledge multiple times
//     : maybe return program name instead of programId?
const getPledge = async (req, res, next) => {
  const { sponsorId, programId } = req.params;

  // ***** RETRIEVES PLEDGE FROM SPONSOR DOCUMENT ***** //
  try {
    const sponsor = await Sponsor.findById(sponsorId);
    const { sponsoredPrograms } = sponsor;
    // Switch to .filter() if a sponsor can pledge only ONCE
    const pledges = sponsoredPrograms.filter(program => program.programId === programId);

    res.status(200).json({
      message: `Successfully retrieved pledge/s.`,
      data: pledges
    })
  } catch (err) {
    res.status(400).json({
      message: `Failed to retrieve pledge/s.`
    });

    next(err);
  }

  // ***** RETRIEVES PLEDGE FROM PROGRAM DOCUMENT ***** //
  // try {
  //   const program = await Program.findById(programId);
  //   const { sponsors } = program;
  //   // Switch to .filter() if a sponsor can pledge only ONCE
  //   const pledges = sponsors.filter(sponsor => sponsor.sponsorId === sponsorId);

  //   res.status(200).json({
  //     message: `Successfully retrieved pledge/s.`,
  //     data: pledges
  //   })
  // } catch (err) {
  //   res.status(400).json({
  //     message: `Failed to retrieve pledge/s.`
  //   });

  //   next(err);
  // }
}

const revertPledge = async (req, res, next) => {
  const { sponsorId, programId } = req.params;

  try {
    const program = await Program.findById(programId);
    const { sponsors } = program;

    const pledges = sponsors.filter(sponsor => sponsor.sponsorId === sponsorId);
    const amountFundedPerPledge = pledges.map(sponsor => sponsor.amountFunded);
    const totalPledgedAmount = amountFundedPerPledge.reduce((total, currentValue) => total += currentValue);

    /// Promises to be passed to Promise.all()
    const addAmountToSponsor = Sponsor.findByIdAndUpdate(
      sponsorId,
      {
        $inc: { balance: totalPledgedAmount },
        $pull: { sponsoredPrograms: { programId } }
      }
    )
    const reduceProgramBalance = Program.findByIdAndUpdate(
      programId,
      {
        $inc: { balance: -totalPledgedAmount },
        $pull: { sponsors: { sponsorId } }
      }
    )

    Promise.all([addAmountToSponsor, reduceProgramBalance])
      .then(() => {
        res.status(200).json({
          message: 'Successfully reverted pledge/s.'
        });
      });

  } catch (err) {
    res.status(400).json({
      message: `Failed to revert pledge/s.`
    });

    next(err);
  }
}

module.exports = {
  viewSponsor,
  viewAllSponsors,
  createSponsor,
  getBalance,
  getPledge,
  revertPledge
}