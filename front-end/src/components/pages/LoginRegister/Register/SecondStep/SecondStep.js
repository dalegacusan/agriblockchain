import React from 'react';
import PartnerFarmerForm from '../components/Form/PartnerFarmerForm';
import NGOForm from '../components/Form/NGOForm';
import SponsorCorporationForm from '../components/Form/SponsorCorporationForm';
import SponsorIndividualForm from '../components/Form/SponsorIndividualForm';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

export default function SecondStep(props) {
  const { currentUser, classes, activeStep, steps, handleBack, handleNext } = props;

  let toDisplay;

  if (currentUser === "ngo") {
    toDisplay = <NGOForm currentUser={currentUser} />;
  } else if (currentUser === "corporation") {
    toDisplay = <SponsorCorporationForm currentUser={currentUser} />
  } else if (currentUser === "individual") {
    toDisplay = <SponsorIndividualForm currentUser={currentUser} />
  } else if (currentUser === "farmer") {
    toDisplay = <PartnerFarmerForm currentUser={currentUser} />
  }

  return (
    <div>
      <p>Personal Information</p>

      { toDisplay }

      {/* 
        // ========================
        //  NEXT and BACK BUTTONS
        // ========================
      */}
      {
        <Box display="flex" flexDirection="row-reverse">
          <Box p={1}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
          </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>

      }
    </div>
  );
}