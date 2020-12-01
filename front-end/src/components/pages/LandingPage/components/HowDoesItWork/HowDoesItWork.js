import React from 'react';
import Card from './HDIWCard';
import Grid from '@material-ui/core/Grid';

export default function HowDoesItWork() {

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={12}>
        <Card description="Non-governmental organizations submits program funding or assistance request. Program will be published to the website" />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Card description="Registered Sponsors (Corporate or Individual) will select which program to fund. Once a program is funded, a request will be sent to the partner farmers" />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Card description="Partner farmers who wish to participate in the program needs to accept the crop request in the app" />
      </Grid>
    </Grid>
  );
}
