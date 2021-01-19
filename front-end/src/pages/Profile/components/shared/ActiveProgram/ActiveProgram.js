import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
// Contexts
// Components
import LoadingScreen from '../../../../LoadingScreen/LoadingScreen';
import ProgramCard from '../../../../../components/ProgramCard/ProgramCard';
// Pages
// CSS
import styles from './activeprogram.module.css';

export default function ActiveProgram(props) {
	const { currentUser } = props;

	let toDisplay;

	if (currentUser === "ngo") {
		const { activePrograms } = props;

		toDisplay = (
			<>
				{
					activePrograms.length === 0
						?
						(
							<Box mb={2}>
								<Alert severity='error'>You don't have any programs hosted yet.</Alert>
							</Box>
						)
						:
						activePrograms.map((program, index) => {
							const { id: programId, status, stage, about, timeline } = program;
							const { programName, programDescription } = about;
							const { executionDate } = timeline;
							return (
								<Grid key={index} item xs={12} md={6} lg={4}>
									<ProgramCard
										programName={programName}
										programDate={moment(executionDate).format('dddd, MMMM Do YYYY')}
										programDescription={programDescription}
										programStatus={status}
										programStage={stage}
										programId={programId}
									/>
								</Grid>
							)
						})
				}
			</>
		);

	} else if (currentUser === "sponsor") {
		const { sponsoredPrograms } = props;

		// Remove duplicates of same program
		const programIds = sponsoredPrograms.map(program => program.id);
		const filteredSponsoredPrograms = sponsoredPrograms.filter(({ id }, index) => !programIds.includes(id, index + 1))

		toDisplay = (
			<>
				<Grid item xs={12} md={12} lg={12}>
					<p className={styles.activePrograms_header_text}>Currently Sponsored Programs</p>
				</Grid>

				{

					sponsoredPrograms.length === 0
						?
						(
							<Box mb={2}>
								<Alert severity='error'>You haven't sponsored any programs.</Alert>
							</Box>
						)
						:
						filteredSponsoredPrograms.map((program, index) => {
							const { id: programId, status, stage, about, timeline } = program;
							const { programName, programDescription } = about;
							const { executionDate } = timeline;

							return (
								<>
									{
										status !== 'completed' && status !== 'cancelled'
											?
											(
												<Grid key={index} item xs={12} md={6} lg={4}>
													<ProgramCard
														programName={programName}
														programDate={moment(executionDate).format('dddd, MMMM Do YYYY')}
														programDescription={programDescription}
														programStatus={status}
														programStage={stage}
														programId={programId}
													/>
												</Grid>
											)
											:
											null
									}

								</>
							)
						})
				}

				<Grid item xs={12} md={12} lg={12}>
					<p className={styles.activePrograms_header_text}>All Sponsored Programs</p>
				</Grid>

				{
					sponsoredPrograms.length === 0
						?
						(
							<Box mb={2}>
								<Alert severity='error'>You haven't sponsored any programs.</Alert>
							</Box>
						)
						:
						filteredSponsoredPrograms.map((program, index) => {
							const { id: programId, status, stage, about, timeline } = program;
							const { programName, programDescription } = about;
							const { executionDate } = timeline;

							return (
								<>
									<Grid key={index} item xs={12} md={6} lg={4}>
										<ProgramCard
											programName={programName}
											programDate={moment(executionDate).format('dddd, MMMM Do YYYY')}
											programDescription={programDescription}
											programStatus={status}
											programStage={stage}
											programId={programId}
										/>
									</Grid>
								</>
							)
						})
				}
			</>
		);



	} else if (currentUser === "farmer") {
		const { programsParticipated } = props;

		// Remove duplicates of same program
		const programIds = programsParticipated.map(program => program.id);
		const filteredProgramsParticipated = programsParticipated.filter(({ id }, index) => !programIds.includes(id, index + 1))

		toDisplay = (
			<>
				{
					programsParticipated.length === 0
						?
						(
							<Box mb={2}>
								<Alert severity='error'>You don't have any programs hosted yet.</Alert>
							</Box>
						)
						:
						filteredProgramsParticipated.map((program, index) => {
							const { id: programId, status, stage, about, timeline } = program;
							const { programName, programDescription } = about;
							const { executionDate } = timeline;
							return (
								<Grid key={index} item xs={12} md={6} lg={4}>
									<ProgramCard
										programName={programName}
										programDate={moment(executionDate).format('dddd, MMMM Do YYYY')}
										programDescription={programDescription}
										programStatus={status}
										programStage={stage}
										programId={programId}
									/>
								</Grid>
							)
						})
				}
			</>
		);
	}

	return (
		<>
			<Grid container spacing={2}>
				{toDisplay}
			</Grid>
		</>
	);
}