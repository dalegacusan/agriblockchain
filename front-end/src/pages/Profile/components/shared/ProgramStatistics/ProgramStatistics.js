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



	let toDisplay;

	if (currentUser === 'ngo') {
		// NGO
		const { activePrograms, completedPrograms } = props;
		const activeProgramsCount = activePrograms.length;
		const completedProgramsCount = completedPrograms.length;

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
	} else if (currentUser === 'sponsor') {
		// Sponsor
		const { sponsoredPrograms } = props;

		// Remove duplicated of same program
		const programIds = sponsoredPrograms.map(program => program.id);
		const filteredSponsoredPrograms = sponsoredPrograms.filter(({ id }, index) => !programIds.includes(id, index + 1))
		const sponsoredProgramsCount = filteredSponsoredPrograms.length;

		toDisplay = (
			<>
				<Grid item xs={12} md={12} lg={12}>
					<Box>
						<span className={`${styles.stat_number} ${classes.stat_number_color}`}>{sponsoredProgramsCount}</span>
						<span className={styles.stat_text}>Program{sponsoredProgramsCount === 1 ? '' : 's'} Sponsored</span>
					</Box>
				</Grid>
			</>
		);
	} else if (currentUser === 'farmer') {
		const { programsParticipated } = props;

		// Remove duplicated of same program
		const programIds = programsParticipated.map(program => program.id);
		const filteredProgramsParticipated = programsParticipated.filter(({ id }, index) => !programIds.includes(id, index + 1))
		const participatedProgramsCount = filteredProgramsParticipated.length;

		toDisplay = (
			<>
				<Grid item xs={12} md={12} lg={12}>
					<Box>
						<span className={`${styles.stat_number} ${classes.stat_number_color}`}>{participatedProgramsCount}</span>
						<span className={styles.stat_text}>Program{participatedProgramsCount === 1 ? '' : 's'} Participated</span>
					</Box>
				</Grid>
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