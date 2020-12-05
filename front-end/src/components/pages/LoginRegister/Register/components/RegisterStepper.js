import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function RegisterStepper(props) {
  const { classes, activeStep, setActiveStep, steps, handleNext, handleBack, handleReset } = props;

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
          // (
          //   <div>
          //     <div>
          //       <Button
          //         disabled={activeStep === 0}
          //         onClick={handleBack}
          //         className={classes.backButton}
          //       >
          //         Back
          //   </Button>
          //       <Button variant="contained" color="primary" onClick={handleNext}>
          //         {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          //       </Button>
          //     </div>
          //   </div>
          // )
        }
      </div>
    </div>
  );
}
