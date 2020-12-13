import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { RegistrationDataContext } from '../../../../global/Contexts/RegistrationDataContext';


export default function ThirdStep(props) {
  const history = useHistory();
  const { classes, activeStep, handleBack } = props;

  const { openRegistrationData, setOpenRegistrationData } = useContext(RegistrationDataContext);
  
  const handleChange = e => {
    setOpenRegistrationData({
      ...openRegistrationData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = () => {
    let type = '';
    if (openRegistrationData.type === 'ngo' || openRegistrationData.type === 'farmer') {
      type = openRegistrationData.type;
    } else if (openRegistrationData.type === 'corporation' || openRegistrationData.type === 'individual') {
      type = 'sponsor'
    }
    axios.post(`/api/create/${type}`, openRegistrationData)
      .then(res => {
        console.log(res);
        alert('Successful registration!')
        setOpenRegistrationData({})
        history.push('/');
      }) 
      .catch(err => console.error(err))
  }

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
            name="username"
            label="Username"
            value={openRegistrationData.username}
            onChange={handleChange}
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
            name="password"
            label="Password"
            value={openRegistrationData.password}
            onChange={handleChange}
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
              onClick={handleSubmit}
              disabled={openRegistrationData.username === '' || openRegistrationData.password === '' ? true : false}
            >
              Finish
            </Button>
          </Box>
        </Box>
      }
    </Box>
  );
}