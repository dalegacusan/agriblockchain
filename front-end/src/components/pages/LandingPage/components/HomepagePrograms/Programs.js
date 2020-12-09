import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';

import Program from './Program';

export default function Programs() {
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
    <Container maxWidth="lg" component={Box} mt={2}>
      <Grid container spacing={2}>
        {
          programs.length !== 0 ?
            programs.slice(0, 4).map((program, index) => {
              const { programAbout, timeline } = program;
              const { programName, about, stage, status } = programAbout;
              const { programDate } = timeline;

              return (
                <Grid item xs={12} md={6} lg={3}>
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
    </Container>
  );
}
