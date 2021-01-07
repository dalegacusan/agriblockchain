import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// Contexts
// Components
import ProgramCard from '../../../components/ProgramCard/ProgramCard';
import ActiveProgram from '../components/shared/ActiveProgram/ActiveProgram';
import ProgramStatistics from '../components/shared/ProgramStatistics/ProgramStatistics';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	}
}));

export default withRouter((props) => {
	const { match, currentUser } = props;

	const classes = useStyles();

	const [ngo, setNGO] = useState([]);

	// Find a way to remove loginDetails from state
	const getNGODetails = () => {
		axios.get(`/api/ngo/${match.params.uid}`)
			.then(res => {
				const { data } = res;
				setNGO([data]);
			})
			.catch(err => console.error(err));
	}

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
							const { ngoName, addressLine1, addressLine2, region, city, country } = about;
							const { authorizedRepresentative, contactNumber, contactEmailAddress } = contactDetails;
							const { firstName, lastName, representativeContactNumber, representativeEmailAddress } = authorizedRepresentative;
							const { activePrograms, completedPrograms } = programDetails;

							return (
								<div div className={classes.root}>
									<Grid Grid container>
										<Grid item xs={12}>

											<Avatar>{ngoName[0]}</Avatar>
											<p>{ngoName}</p>
											<p>{addressLine1}</p>
											<p>
												<span>{region}</span>, <span>{city}</span>, <span>{country}</span>,
											</p>
											<p>
												<span>Representative:</span>
												<span>{firstName} {lastName}, {representativeEmailAddress} {representativeContactNumber}</span>
											</p>

											<hr />

											<ProgramStatistics currentUser={currentUser} />

											<ActiveProgram currentUser={currentUser} activePrograms={activePrograms} />

										</Grid>
									</Grid>
								</div>
							);
						})
					)
					: <LoadingScreen />
			}
		</>
	);
})
