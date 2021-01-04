import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function RegisterStepper(props) {
	const { classes, activeStep, steps, handleReset } = props;

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{
					steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))
				}
			</Stepper>
			<div>
				{
					activeStep === steps.length
						?
						(
							<div>
								<Typography className={classes.instructions}>All steps completed</Typography>
								<Button onClick={handleReset}>Reset</Button>
							</div>
						)
						: null
				}
			</div>
		</div>
	);
}
