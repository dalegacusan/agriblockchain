import React from 'react';
import Program from './Program';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Program
          programName="Program Name"
          programDate="December 19, 2020"
          programDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Box display="flex" flexDirection="row-reverse" p={1}>
          <Box>
            <Button variant="contained" color="primary">
              <span>More Programs</span>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
