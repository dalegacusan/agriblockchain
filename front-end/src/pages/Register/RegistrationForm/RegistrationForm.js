import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PartnerFarmerForm from '../components/Form/FarmerForm';
import NGOForm from '../components/Form/NGOForm';
import SponsorForm from '../components/Form/SponsorForm';

export default function SecondStep(props) {
	const { currentUser, classes, activeStep, steps, handleBack, handleNext } = props;

	let toDisplay;

	if (currentUser === "ngo") {
		toDisplay = <NGOForm currentUser={currentUser} />;
	} else if (currentUser === "sponsor") {
		toDisplay = <SponsorForm currentUser={currentUser} />
	} else if (currentUser === "farmer") {
		toDisplay = <PartnerFarmerForm currentUser={currentUser} />
	}

	return (
		<Box mt={3}>
			<Typography component="h6" gutterBottom>Personal Information</Typography>

			{toDisplay}

			{/* 
        // ========================
        //  NEXT and BACK BUTTONS
        // ========================
      */}
			<Box display="flex" flexDirection="row-reverse">
				<Box p={1}>
					<Button
						disabled={activeStep === 0}
						onClick={handleBack}
						className={classes.backButton}
					>
						Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
					>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}