import React from 'react';
import NGOProfile from './components/NGOProfile';
import PartnerFarmerProfile from './components/PartnerFarmerProfile';
import SponsorCorporationProfile from './components/SponsorCorporationProfile';
import SponsorIndividualProfile from './components/SponsorIndividualProfile';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <NGOProfile />
          {/* <PartnerFarmerProfile /> */}
          {/* <SponsorCorporationProfile /> */}
          {/* <SponsorIndividualProfile /> */}
        </Grid>

      </Grid>
    </div>
  );
}
