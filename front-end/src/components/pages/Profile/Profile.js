import React from 'react';
import NGOProfile from './profiles/NGOProfile/NGOProfile';
import PartnerFarmerProfile from './profiles/PartnerFarmerProfile/PartnerFarmerProfile';
import SponsorCorporationProfile from './profiles/SponsorCorporationProfile/SponsorCorporationProfile';
import SponsorIndividualProfile from './profiles/SponsorIndividualProfile/SponsorIndividualProfile';
import ProgramProfile from './profiles/ProgramProfile/ProgramProfile';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Profile(props) {
  const { currentUser } = props;

  const classes = useStyles();

  let toDisplay;

  if (currentUser === "ngo") {
    toDisplay = <NGOProfile currentUser={currentUser} />;
  } else if (currentUser === "corporation") {
    toDisplay = <SponsorCorporationProfile currentUser={currentUser} />
  } else if (currentUser === "individual") {
    toDisplay = <SponsorIndividualProfile currentUser={currentUser} />
  } else if (currentUser === "farmer") {
    toDisplay = <PartnerFarmerProfile currentUser={currentUser} />
  } else if (currentUser === "program") {
    toDisplay = <ProgramProfile currentUser={currentUser} />
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {toDisplay}
        </Grid>
      </Grid>
    </div>
  );
}
