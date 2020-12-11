import React, { useState, useEffect, useContext, Fragment } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { LoginDialogContext } from '../../global/Contexts/LoginDialogContext';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  stage:{
    display: 'inline-block',
    backgroundColor: theme.palette.secondary.main,
    padding: '0.2rem 0.5rem',
    marginBottom: '0.5rem',
    color: theme.palette.secondary.contrastText,
    textTransform: 'capitalize'
  },
}));


export default withRouter(function ProgramPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { match } = props;

  const { loginData } = useContext(LoginDialogContext);
  const [ program, setProgram ] = useState({
    "programAbout": {
      "completed": false,
      "status": "",
      "stage": "",
      "currentAmount": 0,
      "programName": "",
      "about": "",
      "cityAddress": "",
      "ngo": "",
      "requiredAmount": 0
    },
    "timeline": {
      "programDate": ""
    },
    "farmersParticipating": [],
    "sponsors": [
      {
        "sponsorId": "",
        "amountFunded": 0,
        "dateFunded": ""
      },
      {
        "sponsorId": "",
        "amountFunded": 0,
        "dateFunded": ""
      }
    ],
    "produceRequirements": [],
    "id": ""    
  });

  useEffect(() => {
    axios.get(`/api/program/${match.params.programId}`)
      .then((res) => {
        console.log(res.data);
        setProgram(res.data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <Container maxWidth="md" component={Box} mb={5}>
      <Button 
        startIcon={<ArrowBackIcon/>}
        onClick={() => history.goBack()}
      >
        Go Back to Programs
      </Button>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} lg={5}>
          <Box pb={2}>
            <Box>
              <Typography component="h1" variant="h2" gutterBottom>
                {program.programAbout.programName}
              </Typography>
              <Typography component="h6" variant="h6" gutterBottom>
                NGO: {program.programAbout.ngo}
              </Typography>
              <Box>
                <Typography display="inline" variant="subtitle2" gutterBottom>
                  Status: &nbsp;
                </Typography>
                <Typography display="inline" variant="overline" color="primary" gutterBottom>
                  Active 
                </Typography>
              </Box>
              <Box>
                <Typography display="inline" variant="subtitle2">
                  Stage: &nbsp;&nbsp;
                </Typography>
                <Typography display="inline" variant="subtitle1" className={classes.stage}>
                  {program.programAbout.stage}
                </Typography>
              </Box>
              <Box>
                <Typography display="inline" variant="subtitle2">
                  Program Date: &nbsp;
                </Typography>
                <Typography display="inline" variant="subtitle1">
                  {moment(program.timeline.programDate).format('dddd, MMMM Do YYYY')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={8} lg={7}>
          <Box pb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
            <CircularProgressWithLabel value={ program.programAbout.currentAmount / program.programAbout.requiredAmount * 100} />
            <Box my={2}>
              <Typography variant="h6" component="div">
                &#8369;{program.programAbout.currentAmount} of &#8369;{program.programAbout.requiredAmount} pledged
              </Typography>
            </Box>
            {
              loginData.username !== "" && ( loginData.type === "individual" || loginData.type === "corporation" ) ?
                <Button 
                  variant="contained" 
                  color="primary"
                  disabled={ program.programAbout.stage === "procurement" ? true : false }
                > 
                  Make a Pledge
                </Button>
                :
                <Typography variant="button" component="div" color="textSecondary">
                  You must be sponsor to make a pledge
                </Typography>
            }
          </Box>
        </Grid>
      </Grid>
      <Divider/>
      <Box pt={3}>
        <Typography component="p" variant="body1" paragraph>
          {program.programAbout.about}
        </Typography>
        <Typography variant="subtitle2">
          Current sponsors          
        </Typography>
        {
          program.sponsors.map((sponsor, index) => (
            <Typography variant="subtitle1" key={index}>
              {sponsor.sponsorId} (&#8369;{sponsor.amountFunded})
            </Typography>
          ))
        }
        <br/>
        <Typography variant="subtitle2">
          Farmers participating
        </Typography>
        {
          program.farmersParticipating.map((farmer, index) => (
            <Typography variant="subtitle1" key={index}>
              farmer here
            </Typography>
          ))
        }
      </Box>
    </Container>
  )
})

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex" >
            <CircularProgress size={240} variant="determinate" color="secondary" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h3" component="div" color="textSecondary">
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}