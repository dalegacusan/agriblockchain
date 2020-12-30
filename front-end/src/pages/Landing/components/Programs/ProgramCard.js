import React, { useState, useEffect } from 'react';

// Components
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// Contexts
// Pages
// CSS
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
  stage: {
    display: 'inline-block',
    backgroundColor: theme.palette.secondary.main,
    padding: '0.2rem 0.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.secondary.contrastText,
  },
}));

export default function ProgramCard(props) {
  console.log(props.match.params);

  const {
    programName,
    programDate,
    programDescription,
    programStatus,
    programStage
  } = props;
  const classes = useStyles();

  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    switch (programStage) {
      case 'crowdfunding':
        setStage('Looking for sponsors');
        break;
      case 'procurement':
        setStage('Coordinating with farmers');
        break;
      case 'execution':
        setStage('Delivering to beneficiaries');
        break;
      case 'leftover':
        setStage('Cleaning up');
        break;
      default:
        setStatus('Stage unavailable');
    }
  }, [programStage])

  useEffect(() => {
    switch (programStatus) {
      case 'active':
        setStatus('Active');
        break;
      case 'completed':
        setStatus('Completed');
        break;
      case 'cancelled':
        setStatus('Cancelled');
        break;
      default:
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
