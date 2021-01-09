import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// Contexts
// Components
import LoadingScreen from '../../../../LoadingScreen/LoadingScreen';
import ProgramCard from '../../../../../components/ProgramCard/ProgramCard';
// Pages
// CSS

export default function ActiveProgram(props) {
	const { currentUser, activePrograms } = props;

	let toDisplay;

	if (currentUser === "ngo") {
		toDisplay = activePrograms.map((program, index) => {
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
	} else if (currentUser === "corporation") {
		toDisplay = (
			<>
				{/* Brings user to the Program Profile page */}
				<p><a href="/">Active Program Name</a></p>
				<p>
					Status:
					<span><i>Active, Cancelled, Completed</i></span>
				</p>
				<p>
					Stage:
					<span><i>Funding, Procurement, Execution</i></span>
				</p>
				<p>
					Date Funded:
					<span>12/3/2020</span>
				</p>
				<p>
					Amount Funded:
					<span>20,000</span>
				</p>
			</>
		);
	} else if (currentUser === "individual") {
		toDisplay = (
			<>

				{/* Brings user to the Program Profile page */}
				<p><a href="/">Active Program Name</a></p>
				<p>
					Status:
					<span><i>Active, Cancelled, Completed</i></span>
				</p>
				<p>
					Stage:
					<span><i>Funding, Procurement, Execution</i></span>
				</p>
				<p>
					Date Funded:
					<span>12/3/2020</span>
				</p>
				<p>
					Amount Funded:
					<span>20,000</span>
				</p>
			</>
		);
	} else if (currentUser === "farmer") {
		toDisplay = (
			<>

				{/* Brings user to the Program Profile page */}
				<p><a href="/">Active Program Name</a></p>
				<p>
					Status:
					<span><i>Active, Cancelled, Completed</i></span>
				</p>
				<p>
					Stage:
					<span><i>Funding, Procurement, Execution</i></span>
				</p>
				<p>
					Date Participated:
					<span>12/3/2020</span>
				</p>
				<p>
					Expected Amount:
					<span>12,000</span>
				</p>
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