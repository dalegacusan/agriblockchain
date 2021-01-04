import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import NGO from './profiles/NGO/NGO';
import Farmer from './profiles/Farmer/Farmer';
import Sponsor from './profiles/Sponsor/Sponsor';
import Program from './profiles/Program/Program';
import PageNotFound from '../Error/404/PageNotFound';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default function Profile(props) {
	const { currentUser } = props;

	const classes = useStyles();

	let toDisplay;
	switch (currentUser) {
		case 'ngo':
			toDisplay = <NGO currentUser={currentUser} />;
			break;
		case 'sponsor':
			toDisplay = <Sponsor currentUser={currentUser} />
			break;
		case 'farmer':
			toDisplay = <Farmer currentUser={currentUser} />
			break;
		default:
			toDisplay = <PageNotFound />
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					{toDisplay}
				</Grid>
			</Grid>
		</div>
	);
}
