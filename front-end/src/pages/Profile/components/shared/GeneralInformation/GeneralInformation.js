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
		addressLine1: ngoAddressLine1,
		region: ngoRegion,
		city: ngoCity,
		country: ngoCountry,
		representativeFirstName,
		representativeLastName,
		representativeContactNumber,
		contactNumber: ngoContactNumber,
		contactEmailAddress: ngoContactEmailAddress
	} = props;

	// Sponsor
	const {
		sponsorFirstName,
		sponsorLastName,
		corporationUnder,
		addressLine1: sponsorAddressLine1,
		region: sponsorRegion,
		city: sponsorCity,
		country: sponsorCountry,
		contactNumber: sponsorContactNumber,
		contactEmailAddress: sponsorContactEmailAddress
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
									<span>{ngoContactNumber}, {ngoContactEmailAddress}</span>
								</p>
								<p>{ngoAddressLine1}</p>
								<p>
									<span>{ngoRegion}</span>, <span>{ngoCity}</span>, <span>{ngoCountry}</span>,
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
			toDisplay = (
				<>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6} lg={6}>
							<Box>

								<h1>{sponsorFirstName} {sponsorLastName}</h1>
								<p>{corporationUnder}</p>
								<p>
									<span>{sponsorContactNumber}, {sponsorContactEmailAddress}</span>
								</p>
								<p>{sponsorAddressLine1}</p>
								<p>
									<span>{sponsorRegion}</span>, <span>{sponsorCity}</span>, <span>{sponsorCountry}</span>,
								</p>

							</Box>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<img src='/images/sponsor.svg' alt='ngo' style={{ width: '80%' }} />
						</Grid>

					</Grid>
				</>
			);
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