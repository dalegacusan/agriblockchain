import React from 'react';
import Agreement from './FirstStep/Agreement';
import RegisterStepper from './components/RegisterStepper';
import SecondStep from './SecondStep/SecondStep';
import ThirdStep from './ThirdStep/ThirdStep';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Register(props) {
  const { currentUser } = props;
  const classes = useStyles();

  // ===========================
  //  Stepper Handlers
  // ===========================
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Terms and Conditions', 'Personal Information', 'Produce Details'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <RegisterStepper
            classes={classes}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReset={handleReset}
          />
        </Grid>

        <Grid item xs={12}>
          {
            activeStep === 0
              ?
              <Agreement
                handleNext={handleNext}
              />
              : activeStep === 1
                ?
                <SecondStep
                  currentUser={currentUser}
                  classes={classes}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
                :
                <ThirdStep />
          }

        </Grid>

        {/* <Grid item xs={12}>
          <Form />
        </Grid> */}

      </Grid>
    </div>
  );
}
