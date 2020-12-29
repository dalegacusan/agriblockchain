import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

// Components
import ProgramCard from './ProgramCard';
// MaterialUI
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// Contexts
// Pages
// CSS

export default function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('/api/program/all')
      .then((res) => {
        const { data } = res;
        const { dataRetrieved } = data;

        setPrograms(dataRetrieved);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Container maxWidth="lg" component={Box} mt={2}>
      <Grid container spacing={2}>
        {
          programs.length !== 0
            ?
            programs.slice(0, 4).map((program, index) => {
              const { about, timeline } = program;
              const { programName, programDescription, stage, status } = about;
              const { programDate } = timeline;

              return (
                <Grid item xs={12} md={6} lg={3}>
                  <ProgramCard
                    key={index}
                    programName={programName}
                    programDate={moment(programDate).format('dddd, MMMM Do YYYY')}
                    programDescription={programDescription}
                    programStage={stage}
                    programStatus={status}
                  />
                </Grid>
              )
            })
            :
            <Box width="100%" textAlign="center">
              <CircularProgress />
            </Box>
        }
      </Grid>
    </Container>
  );
}
