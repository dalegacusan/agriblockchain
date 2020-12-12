import React, { useState, useEffect, useContext } from 'react';
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
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  const [ sponsors, setSponsors ] = useState([]);
  const [ pledgeDialog, setPledgeDialog ] = useState({
    open: false,
    pledgeAmount: 0,
  });

  const handleOpen = () => {
    setPledgeDialog({ ...pledgeDialog, open: true })
  }
  
  const handleClose = () => {
    setPledgeDialog({ ...pledgeDialog, open: false })
  }

  useEffect(() => {
    axios.get(`/api/programs/${match.params.programId}`)
      .then((res) => {
        setProgram(res.data);
        if (res.data.sponsors.length !== 0) {
          res.data.sponsors.forEach(sponsor => {
            axios.get(`/api/sponsors/${sponsor.sponsorId}`)
              .then(res => {
                setSponsors(initialArray => [...initialArray, res.data])
              })
              .catch(err => 
                console.error(err)  
              );
          });
        }
      })
      .catch(err => console.log(err))
  }, [match.params.programId]);

  return (
    <>
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
                    onClick={handleOpen}
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
              <Box display="flex" flexDirection="row" alignItems="center" my={1}>
                <Avatar>{sponsors[index] && sponsors[index].sponsorAbout.corporationName[0]}</Avatar>
                <Typography variant="subtitle1" key={index} style={{ marginLeft: 8 }}>
                  {sponsors[index] && sponsors[index].sponsorAbout.corporationName} (&#8369;{sponsor.amountFunded})
                </Typography>
              </Box>
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
      <Dialog open={pledgeDialog.open} onClose={handleClose} aria-labelledby="form-dialog-pledge">
        <DialogTitle id="form-dialog-pledge">Make a Pledge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To pledge to this program, please enter the amount here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Pledge Amount"
            fullWidth
            id="pledgeAmount"
            name="pledgeAmount"
            type="number"
            value={setPledgeDialog.pledgeAmount}
            onChange={(e) => setPledgeDialog({ ...pledgeDialog, pledgeAmount: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start">&#8369;</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Pledge
          </Button>
        </DialogActions>
      </Dialog>
    </>
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