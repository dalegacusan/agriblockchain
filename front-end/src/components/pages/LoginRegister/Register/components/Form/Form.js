import React from 'react';

import NGO_Form from './NGO_Form';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Form() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>

      {/* I AM A... */}
      <Grid item xs={12} md={12} lg={12}>
        <FormLabel component="legend">I am a</FormLabel>

        <RadioGroup aria-label="gender" name="userType" row>
          <Grid item xs={6} md={6} lg={6}>
            <FormControlLabel value="NGO" control={<Radio />} label="NGO" />
            <FormControlLabel value="Sponsor (Corporation)" control={<Radio />} label="Sponsor (Corporation)" />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <FormControlLabel value="Sponsor (Individual)" control={<Radio />} label="Sponsor (Individual)" />
            <FormControlLabel value="Partner Farmer" control={<Radio />} label="Partner Farmer" />
          </Grid>
        </RadioGroup>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <p>Please enter the following details</p>
        <NGO_Form />
      </Grid>

    </Grid>
  );
}