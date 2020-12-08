import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Program from './Program';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      bottom: theme.spacing(4) * 1.3,
      right: theme.spacing(5) * 1.3,
    },
  },
}));

export default function Programs() {
  const classes = useStyles();

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
  };

  // replace this with mock json object from axios post later
  const allPrograms = [
    {
      programName: 'Feeding Program 1',
      programDate: 'December 19, 2020',
      programDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      programStage: 'crowdfunding',
      programStatus: 'active',
    },
    {
      programName: 'Feeding Program 2',
      programDate: 'December 23, 2020',
      programDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      programStage: 'crowdfunding',
      programStatus: 'active',
    },
    {
      programName: 'Feeding Program 3',
      programDate: 'December 9, 2020',
      programDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      programStage: 'execution',
      programStatus: 'completed',
    },
    {
      programName: 'Feeding Program 4',
      programDate: 'December 5, 2020',
      programDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      programStage: 'leftover',
      programStatus: 'cancelled',
    },
  ];

  return (
    <Container maxWidth="lg" component={Box} mt={5}>
      <Typography variant="h2" component="h1" gutterBottom>
        All Programs
      </Typography>
      <Grid container spacing={2}>
        {allPrograms.map((program, index) => (
          <Grid item xs={12} md={6} lg={4}>
            <Program
              programName={program.programName}
              programDate={program.programDate}
              programDescription={program.programDescription}
              programStage={program.programStage}
              programStatus={program.programStatus}
              key={index}
            /> 
          </Grid>
        ))}
      </Grid>
      <Link component={RouterLink} to="/program/create">
        <Fab aria-label="Create Program" className={classes.fab} color="primary" variant="extended" style={fabStyle}>
          <AddIcon/>
          Create Program
        </Fab>
      </Link>
    </Container>
  );
}
