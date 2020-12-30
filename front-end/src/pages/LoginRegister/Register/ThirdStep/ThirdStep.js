import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { RegistrationDataContext } from '../../../../contexts/RegistrationDataContext';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer * 100,
    color: '#fff',
  },
}));


export default function ThirdStep(props) {
  const history = useHistory();
  const classes = useStyles();
  const { activeStep, handleBack } = props;

  const { openRegistrationData, setOpenRegistrationData } = useContext(RegistrationDataContext);

  const [loading, setLoading] = useState(false);

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
    } else if (openRegistrationData.type === 'sponsor') {
      type = 'sponsor';
    }
    setLoading(true);
    if (type === 'sponsor') {
      axios.post(`/api/sponsor/create`, openRegistrationData)
        .then(res => {
          alert('Successful registration!');

          setOpenRegistrationData({});
          setLoading(false);

          history.push('/');

          // axios.post(
          //   `http://192.168.1.2:7545/api/crowdfunding/mint/`,
          //   {
          //     amount: 100000,
          //     bodyAddress: address,
          //     // Enter Address Key
          //     bodyPrivateKey: '0x6c68b1bc58f1fc4fefffdfe1849e8c0c94430784ec6615616c4a22d3ceced0dd'
          //   }
          // )
          //   .then(result => {
          //     console.log(res);
          //     alert('Successful registration!')
          //     setOpenRegistrationData({})
          //     setLoading(false);
          //     history.push('/');
          //   })
        })
        .catch(err => {
          alert('Something went wrong. Please check logs.');
          console.error(err);
          setLoading(false);
        })
    }
  }

  return (
    <>
      {/* Backdrop Status */}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress size={28} color="inherit" />
        <Box ml={2}>
          <Typography variant="button">
            Submitting
          </Typography>
        </Box>
      </Backdrop>

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
    </>
  );
}