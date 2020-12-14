const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
  farmerId: String,
  name: String,
  price: Number,
  quantity: Number
});

const produceRequirementSchema = new mongoose.Schema({
  taken: Boolean,
  takenByFarmerId: String,
  name: String,
  price: Number,
  quantity: Number
});

produceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

produceRequirementSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = {
  produce: mongoose.model('Produce', produceSchema),
  produceRequirement: mongoose.model('ProduceRequirement', produceRequirementSchema)
};