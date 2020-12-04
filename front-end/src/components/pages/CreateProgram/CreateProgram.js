import React from 'react';
import ProgramTimelineForm from './components/ProgramTimelineForm';
import GeneralProgramInfoForm from './components/GeneralProgramInfoForm';
import ProduceRequirementsForm from './components/Requirements/ProduceRequirementsForm';
import FundRequirementsForm from './components/Requirements/FundRequirementsForm';
import SponsorshipOptions from './components/SponsorshipOptions/SponsorshipOptions';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function CreateProgram(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>

          <form noValidate autoComplete="off">

            <GeneralProgramInfoForm />

            <ProgramTimelineForm />

            {/* Must be able to add more than one produce */}
            <ProduceRequirementsForm />

            <FundRequirementsForm />

            <SponsorshipOptions />

            <Button variant="contained" color="secondary">Submit</Button>
            <Button variant="contained" color="primary">
              Clear
            </Button>
          </form>

        </Grid>
      </Grid>
    </div>
  );
}
