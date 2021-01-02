import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';

import { LoginDialogContext } from '../../../contexts/LoginDialogContext';

// import ProgramTimelineForm from './components/ProgramTimelineForm';
// import GeneralProgramInfoForm from './components/GeneralProgramInfoForm';
// import ProduceRequirementsForm from './components/Requirements/ProduceRequirementsForm';
// import FundRequirementsForm from './components/Requirements/FundRequirementsForm';
// import SponsorshipOptions from './components/SponsorshipOptions/SponsorshipOptions';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

export default function CreateProgram() {
	const classes = useStyles();
	const history = useHistory();

	const { loginData } = useContext(LoginDialogContext)

	const [newProgram, setNewProgram] = useState({
		programName: '',
		about: '',
		cityAddress: '',
		ngo: loginData.uid,
		requiredAmount: 0,
		programDate: new Date().toLocaleDateString(),
	});
	const [submitLoading, setSubmitLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleChange = e => {
		setNewProgram({
			...newProgram,
			[e.target.name]: e.target.value,
		})
	};

	const handleDateChange = date => {
		setNewProgram({
			...newProgram,
			programDate: date,
		})
	};

	const handleSubmit = () => {
		setSubmitLoading(true)
		if (loginData.uid) {
			axios.post('/api/program/create', newProgram)
				.then(res => {
					console.log(res);
					setSubmitLoading(false);
					setError(false);
					setSuccess(true);
					setNewProgram({
						programName: '',
						about: '',
						cityAddress: '',
						ngo: loginData.uid,         // must be ngo: '5fcdafdafcda8f250439db05'
						requiredAmount: 0,
						programDate: new Date().toLocaleDateString(),
					})
				})
				.catch(err => {
					console.error(err);
					setSubmitLoading(false);
					setError(true);
					setSuccess(false);
				})
		} else {
			console.error('Not logged in as an NGO!');
			setSubmitLoading(false);
			setError(true);
			setSuccess(false);
		}
	};

	return (
		<Container maxWidth="md" component={Box} mb={5} className={classes.root}>
			<Backdrop className={classes.backdrop} open={submitLoading}>
				<CircularProgress size={28} color="inherit" />
				<Box ml={2}>
					<Typography variant="button">
						Submitting
					</Typography>
				</Box>
			</Backdrop>
			<Button
				startIcon={<ArrowBackIcon />}
				onClick={() => history.goBack()}
			>
				Go Back to Programs
			</Button>
			<Typography component="h1" variant="h2" gutterBottom>
				Create Program
			</Typography>
			<Box mb={2} display={error ? "block" : "none"}>
				<Alert severity="error">Something went wrong. Please check logs.</Alert>
			</Box>
			<Box mb={2} display={success ? "block" : "none"}>
				<Alert severity="success">Successful program creation!</Alert>
			</Box>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<form noValidate autoComplete="off">
						<Box my={1}>
							<TextField
								label="Program Name"
								placeholder="Program Name"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								id="programName"
								name="programName"
								value={newProgram.programName}
								onChange={handleChange}
							/>
						</Box>
						<Box my={1}>
							<TextField
								label="About Program"
								placeholder="About Program"
								fullWidth
								multiline
								rows={6}
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								id="about"
								name="about"
								value={newProgram.about}
								onChange={handleChange}
							/>
						</Box>
						<Box my={1}>
							<TextField
								label="City Address"
								placeholder="City Address"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								id="cityAddress"
								name="cityAddress"
								value={newProgram.cityAddress}
								onChange={handleChange}
							/>
						</Box>
						<Box my={1}>
							<TextField
								label="Required Funding Amount"
								placeholder="Required Funding Amount"
								fullWidth
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								type="number"
								id="requiredAmount"
								name="requiredAmount"
								value={newProgram.requiredAmount}
								onChange={handleChange}
								InputProps={{
									startAdornment: <InputAdornment position="start">&#8369;</InputAdornment>,
								}}
							/>
						</Box>
						<Box my={1}>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant="inline"
									format="MM/DD/yyyy"
									margin="normal"
									label="Program Start Date"
									helperText="Default today upon submission"
									disabled
									id="programDate"
									name="programDate"
									value={newProgram.programDate}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										"aria-label": "change date",
									}}
								/>
							</MuiPickersUtilsProvider>
						</Box>

						{/* 
							<GeneralProgramInfoForm />
							<ProgramTimelineForm />
							<ProduceRequirementsForm />
							<FundRequirementsForm />
							<SponsorshipOptions /> 
						*/}

						{/* Must be able to add more than one produce */}
						<Box display="flex" flexDirection="row-reverse" mt={5}>
							<Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
						</Box>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}