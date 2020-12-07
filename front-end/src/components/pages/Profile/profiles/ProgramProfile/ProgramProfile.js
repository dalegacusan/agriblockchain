import React from 'react';
import ActiveProgram from '../../components/ActiveProgram/ActiveProgram';
import ProgramTimeline from './components/ProgramTimeline/ProgramTimeline';
import AboutProgram from './components/AboutProgram/AboutProgram';
import SponsorshipOptions from './components/SponsorshipOptions/SponsorshipOptions';
import ActionButtons from './components/ActionButtons/ActionButtons';
import FundingHistory from './components/FundingHistory/FundingHistory';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function ProgramProfile(props) {
  const { currentUser } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ backgroundColor: 'lightgray' }}>
        <Grid item xs={12}>

          <Avatar>P</Avatar>
          <p>Program Name</p>
          <p>City Address</p>
          <p>NGO Name: <span>World Food Programme</span></p>

          <p>Program Status: <span><i>Active, Cancelled, Completed</i></span></p>
          <p>Program Stage: <span><i>Funding, Procurement, Execution</i></span></p>

          <ProgramTimeline />

          <AboutProgram />

          <ActiveProgram currentUser={currentUser} />

          <SponsorshipOptions />

          <ActionButtons />

          <FundingHistory />

        </Grid>

      </Grid>
    </div>
  );
}
