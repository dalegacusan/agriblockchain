import React, { useState, useEffect } from "react";
import axios from 'axios';

// Components
import Grid from '@material-ui/core/Grid';
import Farmer from './components/Farmer';

// MaterialUI

// Contexts

// Pages
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// CSS

function FarmersList() {
	const [farmers, setFarmers] = useState([]);

	useEffect(() => {
		axios.get('/api/farmers')
			.then(res => {
				setFarmers([...farmers, ...res.data]);
			});
	}, []);

	return (
		<div>
			{
				farmers.length !== 0
					? (
						<Grid container spacing={3}>
							<Grid item xs={2}>
								<Farmer farmers={farmers} />
								{/* Will change to actual grid items per farmers next time */}
							</Grid>
						</Grid>
					)
					: <LoadingScreen />
			}
		</div>
	);
}

export default FarmersList;
