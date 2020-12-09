import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function FundRequirementsForm() {
  return (
    <div>
      <p>Fund Requirements</p>

      {/* Program Name */}
      <TextField
        id="outlined-full-width"
        label="Fund Amount Required"
        placeholder="Fund Amount Required"
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