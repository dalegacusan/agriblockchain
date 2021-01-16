import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// Contexts
// Components
import ActiveProgram from '../components/shared/ActiveProgram/ActiveProgram';
import ProgramStatistics from '../components/shared/ProgramStatistics/ProgramStatistics';
import GeneralInformation from '../components/shared/GeneralInformation/GeneralInformation';
// Pages
// CSS

export default withRouter((props) => {
	const { match, currentUser } = props;

	const [ngo, setNGO] = useState([]);

	// Find a way to remove loginDetails from state
	const getNGODetails = async () => {

		try {
			const ngoRetrieved = await axios.get(`/api/ngo/${match.params.uid}`);
			const { data } = ngoRetrieved;
			const { programDetails } = data;
			const { activePrograms } = programDetails;

			const setProgramsPromises = activePrograms.map(async (programId) => {
				const getProgram = await axios.get(`/api/program/${programId}`);

				return getProgram;
			});

			const retrieveProgramsPromisesData = await Promise.all(setProgramsPromises)
				.then(res => {
					const newActiveProgramsArray = res.map(promiseResult => {
						const { data } = promiseResult;

						return data;
					});

					data.programDetails.activePrograms = newActiveProgramsArray;
				});

			setNGO([data]);
		} catch (err) {
			console.error(err);
		}
	}

	console.log(ngo);

	useEffect(() => {
		getNGODetails();
	}, [])

	return (
		<>
			{
				ngo.length !== 0
					? (
						ngo.map(currentNGO => {
							const { id, about, contactDetails, programDetails } = currentNGO;
							const { ngoName, ngoDescription, addressLine1, region, city, country } = about;
							const { authorizedRepresentative, contactNumber, contactEmailAddress } = contactDetails;
							const { firstName: representativeFirstName, lastName: representativeLastName, representativeContactNumber } = authorizedRepresentative;
							const { activePrograms, completedPrograms } = programDetails;

							return (
								<>
									<Grid item xs={12}>
										<GeneralInformation
											currentUser={currentUser}
											ngoName={ngoName}
											ngoDescription={ngoDescription}
											addressLine1={addressLine1}
											region={region}
											city={city}
											country={country}
											representativeFirstName={representativeFirstName}
											representativeLastName={representativeLastName}
											representativeContactNumber={representativeContactNumber}
											contactNumber={contactNumber}
											contactEmailAddress={contactEmailAddress}
										/>
									</Grid>

									<ProgramStatistics
										currentUser={currentUser}
										activePrograms={activePrograms}
										completedPrograms={completedPrograms}
									/>
									<ActiveProgram
										currentUser={currentUser}
										activePrograms={activePrograms}
									/>
								</>
							);
						})
					)
					: (
						<Box width='100%' textAlign='center'>
							<CircularProgress />
						</Box>
					)
			}
		</>
	);
})
