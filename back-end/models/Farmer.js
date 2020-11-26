const mongoose = require('mongoose');

// MongoDB URL
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch(error => {
    console.log(`Error connecting to MongoDB:`, error.message)
  });

/* 
  Schema is what a Farmer's data will look like
  Think of it as a BLUEPRINT
*/
const farmerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  location: String,
  produce: Array,
  lastOnline: Date,
  preferredModeOfCommunication: String,
});

// Create a farmer
// const farmerMangJose = new Farmer({
//   firstName: 'Juan',
//   lastName: 'Jose',
//   location: 'Ilocos Norte',
//   produce: ['Potatoes', 'Tomatoes'],
//   lastOnline: new Date(),
//   preferredModeOfCommunication: 'SMS'
// });

// Save a farmer to MongoDB
// farmerMangJose.save()
//   .then(result => {
//     console.log('Farmer Saved to MongoDB!');
//     mongoose.connection.close();
//   })

farmerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/*
  'Farmer' is the collection/table name
  farmerSchema will be the 'blueprint' that the collection will follow
*/
module.exports = mongoose.model('Farmer', farmerSchema);