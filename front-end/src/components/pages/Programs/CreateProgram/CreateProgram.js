import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// import ProgramTimelineForm from './components/ProgramTimelineForm';
// import GeneralProgramInfoForm from './components/GeneralProgramInfoForm';
// import ProduceRequirementsForm from './components/Requirements/ProduceRequirementsForm';
// import FundRequirementsForm from './components/Requirements/FundRequirementsForm';
// import SponsorshipOptions from './components/SponsorshipOptions/SponsorshipOptions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function CreateProgram() {
  const classes = useStyles();
  const history = useHistory();

  const [ newProgram, setNewProgram ] = useState({
    programName: '',
    about: '',
    completed: false,
    cityAddress: '',
    ngo: 'the ngo name',
    status: 'active',     // default upon completion of form
    stage: 'crowdfunding',
    requiredAmount: 0,
    currentAmount: 0,      // default
    programDate: new Date().toLocaleDateString(),
  });

  const handleChange = e => {
    setNewProgram({
      ...newProgram,
      [e.target.name]: e.target.value,
    })
  };

  const handleDateChange = date => {
    setNewProgram({
      ...newProgram,
      programDate: date,
    })
  }

  return (
    <Container maxWidth="md" component={Box} mb={5} className={classes.root}>
      <Button 
        startIcon={<ArrowBackIcon/>}
        onClick={() => history.goBack()}
      >
          Go Back to Programs
      </Button>
      <Typography component="h1" variant="h2" gutterBottom>
        Create Program
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <form noValidate autoComplete="off">
            <Box my={1}>
              <TextField
                label="Program Name"
                placeholder="Program Name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                id="programName"
                name="programName"
                value={newProgram.programName}
                onChange={handleChange}
              />
            </Box>
            <Box my={1}>
              <TextField
                label="About Program"
                placeholder="About Program"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                id="about"
                name="about"
                value={newProgram.about}
                onChange={handleChange}
              />
            </Box>
            <Box my={1}>
              <TextField
                label="City Address"
                placeholder="City Address"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                id="cityAddress"
                name="cityAddress"
                value={newProgram.cityAddress}
                onChange={handleChange}
              />
            </Box>
            <Box my={1}>
              <TextField
                label="Required Funding Amount"
                placeholder="Required Funding Amount"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                type="number"
                id="requiredAmount"
                name="requiredAmount"
                value={newProgram.requiredAmount}
                onChange={handleChange}
              />
            </Box>
            <Box my={1}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/yyyy"
                  margin="normal"
                  label="Program Start Date"
                  helperText="Default today upon submission"
                  disabled
                  id="programDate"
                  name="programDate"
                  value={newProgram.programDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Box>
            {/* <GeneralProgramInfoForm /> */}

            {/* <ProgramTimelineForm />

            
            <ProduceRequirementsForm />

            <FundRequirementsForm />

            <SponsorshipOptions /> */}

            {/* Must be able to add more than one produce */}

            <Box display="flex" flexDirection="row-reverse" mt={5}>
              <Button color="primary" variant="contained">Submit</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}