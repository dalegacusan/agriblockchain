// https://material-ui.com/components/material-icons/
import React, { useContext } from 'react';
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// Contexts
import { LoginDialogContext } from '../../contexts/LoginDialogContext';
// Components
import NGO from './profiles/NGO';
import Farmer from './profiles/Farmer';
import Sponsor from './profiles/Sponsor';
import Program from './profiles/Program';
import PageNotFound from '../Error/404/PageNotFound';
// Pages
// CSS
const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	}
}));

export default function Profile() {
	const { loginData } = useContext(LoginDialogContext);
	const { type } = loginData;

	const classes = useStyles();

	let toDisplay;
	switch (type) {
		case 'ngo':
			toDisplay = <NGO currentUser={type} />;
			break;
		case 'sponsor':
			toDisplay = <Sponsor currentUser={type} />
			break;
		case 'farmer':
			toDisplay = <Farmer currentUser={type} />
			break;
		default:
			toDisplay = <PageNotFound />
	}

	return (
		<div className={classes.root}>
			<Container maxWidth='lg' component={Box} mt={5}>
				<Box my={3}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Grid container>
								{toDisplay}
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</div>
	);
}
