import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import styles from './programstatistics.module.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	programStatsBackgroundColor: {
		backgroundColor: theme.palette.secondary.main,
	},
}));

export default function ProgramStatistics(props) {
	const { currentUser } = props;

	const classes = useStyles();

	// NGO
	const { activePrograms, completedPrograms } = props;
	const activeProgramsCount = activePrograms.length;
	const completedProgramsCount = completedPrograms.length;

	let toDisplay;

	if (currentUser === 'ngo') {
		toDisplay = (
			<>
				<Box className={styles.stat_container}>
					<p>{activeProgramsCount + completedProgramsCount}</p>
					<span>Total</span>
				</Box>
				<Box className={styles.stat_container}>
					<p>{activeProgramsCount}</p>
					<span>Active</span>
				</Box>
				<Box className={styles.stat_container}>
					<p>{completedProgramsCount}</p>
					<span>Completed</span>
				</Box>
			</>
		);
	} else if (currentUser === 'corporation') {
		toDisplay = (
			<>
				<p>
					Total Programs Sponsored:
				</p>
				<span>0</span>
				<p>
					Active Programs:
					<span>0</span>
				</p>
				<p>
					Completed Programs:
					<span>0</span>
				</p>
			</>
		);
	} else if (currentUser === 'individual') {
		toDisplay = (
			<>
				<p>
					Total Programs Sponsored:
					<span>0</span>
				</p>
			</>
		);
	} else if (currentUser === 'farmer') {
		toDisplay = (
			<>
				<p>
					Total Programs Participated:
					<span>0</span>
				</p>
				<p>
					Active Programs:
					<span>0</span>
				</p>
				<p>
					Completed Programs:
					<span>0</span>
				</p>
			</>
		);
	}

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Box
						component='div'
						display='flex'
						justifyContent='center'
						className={classes.programStatsBackgroundColor}
						style={
							{
								padding: '25px'
							}
						}
					>
						{toDisplay}
					</Box>
				</Grid>
			</Grid>
		</>
	);
}