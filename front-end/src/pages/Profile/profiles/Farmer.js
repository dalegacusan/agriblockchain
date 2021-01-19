import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// Contexts
// Components
import ActiveProgram from '../components/shared/ActiveProgram/ActiveProgram';
import GeneralInformation from '../components/shared/GeneralInformation/GeneralInformation';
import ProducePortfolio from '../components/Farmer/ProducePortfolio/ProducePortfolio';
import ProgramStatistics from '../components/shared/ProgramStatistics/ProgramStatistics';
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

}));

export default withRouter((props) => {
	const { match, currentUser } = props;
	const classes = useStyles();

	const [farmer, setFarmer] = useState([]);

	const getFarmerDetails = async () => {
		try {
			const farmerRetrieved = await axios.get(`/api/farmer/${match.params.uid}`);
			const { data } = farmerRetrieved;
			const { programsParticipated } = data;

			const setProgramsPromises = programsParticipated.map(async (program) => {
				const { programId } = program
				const getProgram = await axios.get(`/api/program/${programId}`);

				return getProgram;
			});

			const retrieveProgramsPromisesData = await Promise.all(setProgramsPromises)
				.then(res => {
					const newActiveProgramsArray = res.map(promiseResult => {
						const { data } = promiseResult;

						return data;
					});

					data.programsParticipated = newActiveProgramsArray;
				});

			console.log(data);

			setFarmer([data]);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getFarmerDetails();
	}, [])

	return (
		<>
			{
				farmer.length !== 0
					? (
						farmer.map((currentFarmer) => {
							const { id, about, contactDetails, programsParticipated, producePortfolio } = currentFarmer;
							const { firstName, lastName, addressLine1, region, city, country } = about;
							const { contactNumber, contactEmailAddress } = contactDetails;

							return (
								<>
									<Grid item xs={12}>

										<GeneralInformation
											currentUser={currentUser}
											farmerFirstName={firstName}
											farmerLastName={lastName}
											addressLine1={addressLine1}
											region={region}
											city={city}
											country={country}
											contactNumber={contactNumber}
											contactEmailAddress={contactEmailAddress}
										/>
										<ProgramStatistics
											currentUser={currentUser}
											programsParticipated={programsParticipated}
										/>
										<ActiveProgram
											currentUser={currentUser}
											programsParticipated={programsParticipated}
										/>

										<ProducePortfolio
											producePortfolio={producePortfolio}
											getFarmerDetails={() => getFarmerDetails()}
										/>

									</Grid>
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
