import React from 'react';
import Program from './Program';
import Grid from '@material-ui/core/Grid';

export default function Programs() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          programStage="crowdfunding"
          programStatus="active"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          programStage="procurement"
          programStatus="active"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          programStage="execution"
          programStatus="completed"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          programStage="leftover"
          programStatus="cancelled"
        />
      </Grid>
    </Grid>
  );
}
