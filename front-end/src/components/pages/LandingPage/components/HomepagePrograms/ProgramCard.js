import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  stage:{
    display: 'inline-block',
    backgroundColor: theme.palette.secondary.main,
    padding: '0.2rem 0.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ProgramCard(props) {
  const classes = useStyles();
  const { programName, programDate, programDescription, programStatus, programStage } = props;

  const [ stage, setStage ] = useState('');
  const [ status, setStatus ] = useState('');
  
  useEffect(() => {
    if (programStage === 'crowdfunding') {
      setStage('Looking for sponsors');
    } else if (programStage === 'procurement') {
      setStage('Coordinating with farmers');
    } else if (programStage === 'execution') {
      setStage('Delivering to beneficiaries');
    } else if (programStage === 'leftover') {
      setStage('Cleaning up');
    } else {
      setStage('Stage unavailable');
    }
  }, [programStage])

  useEffect(() => {
    if (programStatus === 'active') {
      setStatus('Active');
    } else if (programStatus === 'completed') {
      setStatus('Completed');
    } else if (programStatus === 'cancelled') {
      setStatus('Cancelled');
    } else {
      setStatus('Status unavailable');
    }
  }, [programStatus])
  

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="overline" color="primary">
          {status}
        </Typography>
        <Typography variant="h5" component="h2">
          {programName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {programDate}
        </Typography>
        <Box className={classes.stage}>
          <Typography variant="subtitle2">
            {stage}
          </Typography>
        </Box>
        <Typography variant="body2" component="p" gutterBottom>
          {programDescription}
        </Typography>
      </CardContent>
    </Card>
  );
}
