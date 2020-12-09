import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

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

  const [ programs, setPrograms ] = useState([])

  useEffect(() => {
    axios.get('/api/programs')
      .then((res) => {
        console.log(res.data);
        setPrograms(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Container maxWidth="lg" component={Box} mt={5}>
      <Typography variant="h2" component="h1" gutterBottom>
        All Programs
      </Typography>
      <Grid container spacing={2}>
        {
          programs.length !== 0 ?
            programs.map((program, index) => {
              const { programAbout, timeline } = program;
              const { programName, about, stage, status } = programAbout;
              const { programDate } = timeline;

              return (
                <Grid item xs={12} md={6} lg={4}>
                  <Program
                    key={index}
                    programName={programName}
                    programDate={moment(programDate).format('dddd, MMMM Do YYYY')}
                    programDescription={about}
                    programStage={stage}
                    programStatus={status}
                  />
                </Grid>
              )
            }) 
            :
            <Box width="100%" textAlign="center">
              <CircularProgress/>
            </Box>
        }
      </Grid>
      <Link component={RouterLink} to="/program/create">
        <Fab aria-label="Create Program" className={classes.fab} color="primary" variant="extended" style={fabStyle}>
          <AddIcon />
          Create Program
        </Fab>
      </Link>
    </Container>
  );
}