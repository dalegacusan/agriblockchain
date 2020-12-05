import React from 'react';

import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Agreement(props) {
  const { handleNext } = props;
  const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <div>
      <p>{LoremIpsum}</p>

      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel value="Agree" control={<Radio />} label={<Typography style={{ fontSize: "14px" }}>I agree to the Terms & Conditions and Data Privacy Act</Typography>} />
      </RadioGroup>

      <Box display="flex" flexDirection="row-reverse">
        <Box p={1}>
          <Button variant="contained" color="primary" onClick={handleNext}>
            <span>Next</span>
          </Button>
        </Box>
      </Box>


    </div>
  );
}