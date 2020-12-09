import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function FundRequirementsForm() {
  return (
    <div>
      <p>Sponsorship Options</p>

      {/* Major Sponsor */}
      <TextField
        id="outlined-full-width"
        label="Major Sponsor"
        placeholder="Amount"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />

      {/* Minor Sponsor */}
      <TextField
        id="outlined-full-width"
        label="Minor Sponsor"
        placeholder="Amount"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
}