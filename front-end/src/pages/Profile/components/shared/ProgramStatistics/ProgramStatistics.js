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
		backgroundColor: '#F2E58A',
	},
	stat_number_color: {
		color: theme.palette.primary.main
	}
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
				<Grid item xs={12} md={4} lg={4}>
					<Box>
						<span className={`${styles.stat_number} ${classes.stat_number_color}`}>{activeProgramsCount + completedProgramsCount}</span>
						<span className={styles.stat_text}>Total Programs</span>
					</Box>
				</Grid>
				<Grid item xs={12} md={4} lg={4}>
					<Box>
						<span className={`${styles.stat_number} ${classes.stat_number_color}`}>{activeProgramsCount}</span>
						<span className={styles.stat_text}>Active Programs</span>
					</Box>
				</Grid>
				<Grid item xs={12} md={4} lg={4}>
					<Box>
						<span className={`${styles.stat_number} ${classes.stat_number_color}`}>{completedProgramsCount}</span>
						<span className={styles.stat_text}>Completed Programs</span>
					</Box>
				</Grid>
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
			<div className={classes.root}>
				<Grid container className={`${classes.programStatsBackgroundColor} ${styles.stat_container}`}>
					{toDisplay}
				</Grid>
			</div>
		</>
	);
}