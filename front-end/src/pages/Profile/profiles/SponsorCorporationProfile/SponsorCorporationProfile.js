import React from 'react';
import ProgramStatistics from '../../components/ProgramStatistics/ProgramStatistics';
import ActiveProgram from '../../components/ActiveProgram/ActiveProgram';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function SponsorCorporationProfile(props) {
  const { currentUser } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ backgroundColor: 'lightgray' }}>
        <Grid item xs={12}>

          <Avatar>C</Avatar>
          <p>Sponsor Corporation Name</p>
          <p>City Address</p>
          <p>Program's Wallet Balance: <span>100,000</span></p>
          <ProgramStatistics currentUser={currentUser} />
          <Button variant="contained" color="primary">Sponsor a program</Button>
          <ActiveProgram currentUser={currentUser} />

        </Grid>

      </Grid>
    </div>
  );
}
