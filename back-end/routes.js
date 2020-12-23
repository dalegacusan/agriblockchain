const NGORouter = require('./routes/ngo');
const programRouter = require('./routes/program');
const farmerRouter = require('./routes/farmer');

module.exports = (app) => {
  app.use('/ngo', NGORouter);
  app.use('/program', programRouter);
  app.use('/farmer', farmerRouter);
}
