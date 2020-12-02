import React from 'react';
import Form from './components/Form';
import Agreement from './components/Agreement';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

        <Grid item xs={12}>
          <Agreement />
        </Grid>
        <Grid item xs={12}>
          <Form />
        </Grid>

      </Grid>
    </div>
  );
}
