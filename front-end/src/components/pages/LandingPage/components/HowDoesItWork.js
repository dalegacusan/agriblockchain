import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default function Slideshow(props) {
  const { classes } = props;

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>"How does it work?" Section</Paper>
    </Grid>
  );
}