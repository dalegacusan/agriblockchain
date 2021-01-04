import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ProducePortfolio from './components/ProducePortfolio/ProducePortfolio';
import ActiveProgram from '../../components/ActiveProgram/ActiveProgram';
import ProgramStatistics from '../../components/ProgramStatistics/ProgramStatistics';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default function PartnerFarmerProfile(props) {
	const { currentUser } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container style={{ backgroundColor: 'lightgray' }}>
				<Grid item xs={12}>

					<Avatar>F</Avatar>
					<p>Farmer Full Name</p>
					<p>City Address</p>
					<ProducePortfolio />
					<Button variant="contained" color="primary">Update Produce Portfolio</Button>
					<ProgramStatistics currentUser={currentUser} />
					<Button variant="contained" color="primary">Participate in a program</Button>
					<ActiveProgram currentUser={currentUser} />

				</Grid>

			</Grid>
		</div>
	);
}
