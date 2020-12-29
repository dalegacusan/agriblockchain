import React from 'react';
import { withRouter } from 'react-router-dom';
import Agreement from './FirstStep/Agreement';
import RegisterStepper from './components/RegisterStepper';
import SecondStep from './SecondStep/SecondStep';
import ThirdStep from './ThirdStep/ThirdStep';

import { RegistrationDataProvider } from '../../../contexts/RegistrationDataContext';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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

export default withRouter(function Register(props) {
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
          {
            activeStep === 0
              ?
              <Agreement
                handleNext={handleNext}
                classes={classes}
              />
              : activeStep === 1
                ?
                <SecondStep
                  currentUser={match.params.userType}
                  classes={classes}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
                :
                <ThirdStep
                  currentUser={match.params.userType}
                  classes={classes}
                  activeStep={activeStep}
                  steps={steps}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
          }
        </RegistrationDataProvider>
      </Box>
    </Box>
  );
})
