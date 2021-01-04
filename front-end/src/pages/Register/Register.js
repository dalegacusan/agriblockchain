import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Agreement from './Agreement/Agreement';
import RegisterStepper from './components/RegisterStepper';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import LoginForm from './LoginForm/LoginForm';

import { RegistrationDataProvider } from '../../contexts/RegistrationDataContext';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		flexGrow: 1,
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

export default withRouter((props) => {
	const { match } = props;
	const classes = useStyles();

	// ===========================
	//  Stepper Handlers
	// ===========================
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = ['Terms and Conditions', 'Personal Information', 'Login Credentials'];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	let toDisplay;
	if (activeStep === 0) {
		toDisplay = (
			<Agreement
				handleNext={handleNext}
				classes={classes}
			/>
		);
	} else if (activeStep === 1) {
		toDisplay = (
			<RegistrationForm
				currentUser={match.params.userType}
				classes={classes}
				activeStep={activeStep}
				steps={steps}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		);
	} else {
		toDisplay = (
			<LoginForm
				currentUser={match.params.userType}
				classes={classes}
				activeStep={activeStep}
				steps={steps}
				handleNext={handleNext}
				handleBack={handleBack}
			/>
		);
	}

	return (
		<Box className={classes.root}>
			<RegisterStepper
				classes={classes}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				steps={steps}
				handleNext={handleNext}
				handleBack={handleBack}
				handleReset={handleReset}
			/>
			<Box mx={3}>
				<RegistrationDataProvider>
					{toDisplay}
				</RegistrationDataProvider>
			</Box>
		</Box>
	);
})
