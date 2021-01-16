import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
// Contexts
// Components
import GeneralInformation from '../components/shared/GeneralInformation/GeneralInformation';
import ProgramStatistics from '../components/shared/ProgramStatistics/ProgramStatistics';
import ActiveProgram from '../components/shared/ActiveProgram/ActiveProgram';
// Pages
// CSS



export default withRouter((props) => {
	const { match, currentUser } = props;

	const [sponsor, setSponsor] = useState([]);

	const getSponsorDetails = async () => {

		try {

			const sponsorRetrieved = await axios.get(`/api/sponsor/${match.params.uid}`);
			const { data } = sponsorRetrieved;
			const { programDetails } = data;
			const { sponsoredPrograms } = programDetails;

			const setProgramsPromises = sponsoredPrograms.map(async (program) => {
				const { programId } = program;
				const getProgram = await axios.get(`/api/program/${programId}`);

				return getProgram;
			});

			const retrieveProgramsPromisesData = await Promise.all(setProgramsPromises)
				.then(res => {
					const newSponsoredProgramsArray = res.map(promiseResult => {
						const { data } = promiseResult;

						return data;
					});

					data.programDetails.sponsoredPrograms = newSponsoredProgramsArray;
				});

			setSponsor([data]);

		} catch (err) {
			console.error(err);
		}

	}

	useEffect(() => {
		getSponsorDetails();
	}, [])

	return (
		<>
			{
				sponsor.length !== 0
					? (
						sponsor.map(currentSponsor => {
							console.log(currentSponsor);
							const { id, about, contactDetails, programDetails } = currentSponsor;
							const { firstName, lastName, addressLine1, corporationUnder, region, city, country } = about;
							const { contactNumber, contactEmailAddress } = contactDetails;
							const { sponsoredPrograms } = programDetails;

							return (
								<>
									<Grid item xs={12}>
										<GeneralInformation
											currentUser={currentUser}
											sponsorFirstName={firstName}
											sponsorLastName={lastName}
											corporationUnder={corporationUnder}
											addressLine1={addressLine1}
											region={region}
											city={city}
											country={country}
											contactNumber={contactNumber}
											contactEmailAddress={contactEmailAddress}
										/>
									</Grid>

									<ProgramStatistics
										currentUser={currentUser}
										sponsoredPrograms={sponsoredPrograms}
									/>
									<ActiveProgram
										currentUser={currentUser}
										sponsoredPrograms={sponsoredPrograms}
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