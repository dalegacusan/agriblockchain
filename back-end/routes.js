const NGORouter = require('./routes/ngo');
const programRouter = require('./routes/program');
const sponsorRouter = require('./routes/sponsor');
const farmerRouter = require('./routes/farmer');

/*
  POST is always for CREATING A RESOURCE ( does not matter if it was duplicated )
  PUT is for checking if resource is exists then update , else create new resource.
  PATCH is always for update a resource.
*/

module.exports = (app) => {
  app.use('/ngo', NGORouter);
  app.use('/program', programRouter);
  app.use('/sponsor', sponsorRouter);
  app.use('/farmer', farmerRouter);
}
