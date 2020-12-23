const farmerRouter = require('../back-end/routes/farmer');

module.exports = (app) => {
  app.use('/farmer', farmerRouter);
}
