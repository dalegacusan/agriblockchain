const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./utils/config');

const app = express();

// **************************************************** //
/*
		NOTES

		- Have a restriction before a program gets deleted
		(maybe if there's at least one sponsor, a program
		cannot be deleted?)
*/
// **************************************************** //

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Database Setup
mongoose.connect(
	config.MONGODB_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
)
	.then(() => {
		console.log('Successfully connected to MongoDB!');
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB:', error.message);

		// Exits the program if there's no connection to the Database
		process.exit(1);
	});

// Set up routes
require('./routes')(app);

app.get('*', (req, res) => {
	res.status(404).send('404');
});

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});
