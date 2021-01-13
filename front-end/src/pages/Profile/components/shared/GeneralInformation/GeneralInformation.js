import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ApartmentIcon from '@material-ui/icons/Apartment';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	iconBackgroundColor: {
		backgroundColor: theme.palette.primary.main,
	},
}));

export default function GeneralInformation(props) {
	const { currentUser } = props;
	// NGO
	const {
		ngoName,
		ngoDescription,
		addressLine1,
		region,
		city,
		country,
		representativeFirstName,
		representativeLastName,
		representativeContactNumber,
		contactNumber,
		contactEmailAddress
	} = props;

	const classes = useStyles();

	let toDisplay;

	switch (currentUser) {
		case 'ngo':
			toDisplay = (
				<>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={6}>
							<Box>

								<h1>{ngoName}</h1>
								<p>{ngoDescription}</p>
								<p>
									<span>{contactNumber}, {contactEmailAddress}</span>
								</p>
								<p>{addressLine1}</p>
								<p>
									<span>{region}</span>, <span>{city}</span>, <span>{country}</span>,
								</p>
								<p>
									<span>{representativeFirstName} {representativeLastName}, {representativeContactNumber}</span>
								</p>

							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<img src='/images/ngo.svg' alt='ngo' style={{ width: '100%' }} />
						</Grid>

					</Grid>

				</>

			);
			break;
		case 'sponsor':

			break;
		case 'farmer':

			break;
		default:
	}

	return (
		<Grid item xs={12}>
			{toDisplay}
			<hr />
		</Grid>
	);
}