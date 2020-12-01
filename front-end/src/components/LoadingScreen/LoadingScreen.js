import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '95vh',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingScreen() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}