import React from 'react';
import ProgramStatistics from './ProgramStatistics/ProgramStatistics';
import ProgramFavorites from './ProgramFavorites/ProgramFavorites';
import ActiveProgram from './ActiveProgram/ActiveProgram';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ backgroundColor: 'lightgray' }}>
        <Grid item xs={12}>

          <Avatar>N</Avatar>
          <p>NGO Name</p>
          <p>City Address</p>
          <ProgramStatistics />
          <Button variant="contained" color="primary">Create Program</Button>
          <ProgramFavorites />
          <ActiveProgram />

        </Grid>

      </Grid>
    </div>
  );
}
