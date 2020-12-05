import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default function ThirdStep(props) {
  const { currentUser, classes, activeStep, steps, handleBack, handleNext } = props;

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box mt={3}>
      <Typography component="h6" gutterBottom>
        Login Credentials
      </Typography>
      <form autoCapitalize="off">
        <Box>
          <TextField 
            required
            fullWidth 
            id="username"
            label="Username"
            value={username}
            onChange={handleUsername}
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Username"
          />
          <TextField 
            required
            fullWidth 
            id="password"
            label="Password"
            value={password}
            onChange={handlePassword}
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Password"
            type="password"
          />
        </Box>
      </form>
      {/* 
        // ========================
        //  NEXT and BACK BUTTONS
        // ========================
      */}
      {
        <Box display="flex" flexDirection="row-reverse">
          <Box p={1}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNext}
              disabled={username === '' || password === '' ? true : false}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      }
    </Box>
  );
}