import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RegistrationDataContext } from '../../../../global/Contexts/RegistrationDataContext';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Agreement(props) {
  const { handleNext, classes } = props;
  const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const { setOpenRegistrationData } = useContext(RegistrationDataContext)
  const [ accepted, setAccepted ] = useState(false)

  const handleChange = (e) => {
    setAccepted(e.target.value)
  }

  const cancelReg = () => {
    setOpenRegistrationData({})
  }

  return (
    <Box mt={3}>
      <Typography component="h6" gutterBottom>Terms and Conditions</Typography>
      <Typography variant="body2" component="p" gutterBottom>{LoremIpsum}</Typography>

      <RadioGroup 
        aria-label="t&c" 
        name="t&c1" 
        value={accepted}
        onChange={handleChange}
      >
        <FormControlLabel 
          value="true" 
          control={<Radio />} 
          label={<Typography 
                    style={{ fontSize: "14px" }}
                  >
                    I agree to the Terms & Conditions and Data Privacy Act
                 </Typography>} 
        />
      </RadioGroup>

      <Box display="flex" flexDirection="row-reverse">
        <Box p={1}>
          <Button
            className={classes.backButton}
            component={Link}
            to="/"
            onClick={cancelReg}
          >
            Cancel Registration
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            disabled={!accepted}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}