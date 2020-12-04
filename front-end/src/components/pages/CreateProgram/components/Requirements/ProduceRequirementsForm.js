import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function ProduceRequirementsForm() {
  return (
    <div>
      <p>Produce Requirements</p>

      {/* Program Name */}
      <TextField
        id="outlined-full-width"
        label="Produce Name"
        placeholder="Produce Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />

      <TextField
        id="outlined-multiline-static"
        label="Produce Quantity"
        placeholder="in kg"
        multiline
        rows={6}
        style={{ width: "100%" }}
        variant="outlined"
      />
    </div>
  );
}