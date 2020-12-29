import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { LoginDialogContext } from '../../contexts/LoginDialogContext';

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
  const classes = useStyles();
  const { programName, programDate, programDescription, programStatus, programStage, programId } = props;

  const { loginData } = useContext(LoginDialogContext);
  const [stage, setStage] = useState('');
  const [status, setStatus] = useState('');

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
      <CardActions>
        {
          loginData.username === '' && loginData.type === '' ?
            <Button
              disabled
              size="small"
            >
              Learn More
            </Button>
            :
            <Link component={RouterLink} to={`/program/${programId}`} underline='none'>
              <Button
                size="small"
              >
                Learn More
              </Button>
            </Link>
        }
      </CardActions>
    </Card>
  );
}
