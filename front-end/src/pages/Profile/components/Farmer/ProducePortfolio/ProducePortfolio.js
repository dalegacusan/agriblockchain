import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// Contexts
import { LoginDialogContext } from '../../../../../contexts/LoginDialogContext';
// Components
import ProduceCard from './ProduceCard';
import ProduceDialog from './ProduceDialog';
// Pages
// CSS
import styles from './produceportfolio.module.css';

export default withRouter((props) => {
	const { match, producePortfolio, getFarmerDetails } = props;

	const { loginData, setLoginData } = useContext(LoginDialogContext);

	// Handling opening and close states of dialog box
	// Stores data for produce
	const [produceDialog, setProduceDialog] = useState({
		loading: false,
		open: false,
		produce: {
			name: '',
			price: 0,
			quantity: 0,
		}
	});
	// Handling success and error alert messages
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleProduceOpen = () => {
		setProduceDialog({ ...produceDialog, open: true })
	}

	return (
		<>
			<Grid item xs={12} md={12} lg={12}>
				<p className={styles.sponsoredPrograms_header_text}>
					Produce Portfolio
				</p>

				{
					match.params.uid === loginData.uid
						? (
							<Button onClick={handleProduceOpen} variant="contained" size="small" color="primary" style={{ marginBottom: '20px' }}>
								<AddIcon /> Add Produce
							</Button>
						)
						:
						null
				}

				<Box mb={2} display={error ? 'block' : 'none'}>
					<Alert severity='error'>Something went wrong. Please check logs.</Alert>
				</Box>
				<Box mb={2} display={success ? 'block' : 'none'}>
					<Alert severity='success'>Action successful!</Alert>
				</Box>
			</Grid>

			{
				producePortfolio.length === 0
					?
					(
						<Box mb={2}>
							<Alert severity='error'>You don't have any produce in your portfolio yet.</Alert>
						</Box>
					)
					:
					producePortfolio.map((produce, index) => {
						const {
							produceId,
							name: produceName,
							price: producePrice,
							quantity: produceQuantity
						} = produce;

						return (
							<>
								<ProduceCard
									produceName={produceName}
									producePrice={producePrice}
									produceQuantity={produceQuantity}
								/>
							</>
						);
					})
			}

			<ProduceDialog
				produceDialog={produceDialog}
				setProduceDialog={setProduceDialog}
				getFarmerDetails={getFarmerDetails}
				setSuccess={setSuccess}
				setError={setError}
			/>
		</>
	);
})