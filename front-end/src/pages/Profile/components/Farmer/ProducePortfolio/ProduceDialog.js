import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

// MaterialUI
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// Contexts
import { LoginDialogContext } from '../../../../../contexts/LoginDialogContext';
// Components
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer * 100,
		color: '#fff',
	},
}));

export default withRouter((props) => {
	const { match, produceDialog, setProduceDialog, getFarmerDetails, setSuccess, setError } = props;
	const { loginData, setLoginData } = useContext(LoginDialogContext);

	const classes = useStyles();

	const handleProduceClose = () => {
		setProduceDialog({ ...produceDialog, open: false })
	}

	const handleProduceChange = e => {
		setProduceDialog({
			...produceDialog,
			produce: {
				...produceDialog.produce,
				[e.target.name]: e.target.value
			}
		})
	}

	const submitProduce = () => {
		if (loginData.type === 'farmer') {
			setProduceDialog({
				...produceDialog,
				loading: true
			})
			axios.patch(`/api/farmer/${match.params.uid}/add/produce/`, produceDialog.produce)
				.then(res => {
					console.log(res.data)
					setSuccess(true)
					setProduceDialog({
						loading: false,
						open: false,
						produce: {
							name: '',
							price: 0,
							quantity: 0,
						}
					})
					getFarmerDetails()
				})
				.catch(err => {
					console.error(err)
					setError(true)
					setProduceDialog({
						loading: false,
						open: false,
						produce: {
							name: '',
							price: 0,
							quantity: 0,
						}
					})
					getFarmerDetails()
				})
		} else {
			console.error('Not logged in as a farmer!');
			setError(true);
			setSuccess(false);
			setProduceDialog({
				loading: false,
				open: false,
				produce: {
					name: '',
					price: 0,
					quantity: 0,
				}
			})
			getFarmerDetails()
		}
	}

	return (
		<>
			{/* Backdrop Status */}
			<Backdrop className={classes.backdrop} open={produceDialog.loading}>
				<CircularProgress size={28} color='inherit' />
				<Box ml={2}>
					<Typography variant='button'>
						Submitting
					</Typography>
				</Box>
			</Backdrop>

			{/* Add produce dialog for Farmer */}
			<Dialog
				open={produceDialog.open}
				onClose={handleProduceClose}
				aria-labelledby='form-dialog-produce'
			>
				<DialogTitle id='form-dialog-produce'>Add Produce to Portfolio</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a new produce to your portfolio, please enter the details below.
					</DialogContentText>
					<Box my={2}>
						<TextField
							autoFocus
							label='Produce name'
							fullWidth
							variant='outlined'
							id='produceName'
							name='name'
							value={produceDialog.produce.name}
							onChange={handleProduceChange}
						/>
					</Box>
					<Box my={2}>
						<TextField
							autoFocus
							label='Produce quantity (in kg)'
							fullWidth
							variant='outlined'
							id='produceQuantity'
							name='quantity'
							value={produceDialog.produce.quantity}
							onChange={handleProduceChange}
						/>
					</Box>
					<Box my={2}>
						<TextField
							autoFocus
							label='Price per'
							fullWidth
							variant='outlined'
							type='number'
							id='price'
							name='price'
							value={produceDialog.produce.price}
							onChange={handleProduceChange}
							InputProps={{
								startAdornment: <InputAdornment position='start'>&#8369;</InputAdornment>,
							}}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleProduceClose}
						color='primary'
					>
						Cancel
					</Button>
					<Button
						onClick={submitProduce}
						color='primary'
					>
						Add Produce
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
})
