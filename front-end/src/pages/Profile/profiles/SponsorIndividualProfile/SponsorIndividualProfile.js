import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ActiveProgram from '../../components/ActiveProgram/ActiveProgram';
import ProgramStatistics from '../../components/ProgramStatistics/ProgramStatistics';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default function SponsorIndividualProfile(props) {
	const { currentUser } = props;
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container style={{ backgroundColor: 'lightgray' }}>
				<Grid item xs={12}>

					<Avatar>I</Avatar>
					<p>Sponsor Individual Full Name</p>
					<p>City Address</p>
					<p>
						User&apos;s Wallet Balance:
						<span>50,000</span>
					</p>
					<ProgramStatistics currentUser={currentUser} />

					<p>Active Programs</p>
					<p>
						Active Programs:
						<span>0</span>
					</p>

					<p>Completed Programs</p>
					<p>
						Completed Programs:
						<span>0</span>
					</p>

					<Button variant="contained" color="primary">Sponsor a program</Button>

					<ActiveProgram currentUser={currentUser} />

				</Grid>

			</Grid>
		</div>
	);
}
