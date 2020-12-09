import React from 'react';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function GeneralProgramInfoForm() {
  return (
    <div>
      {/* Program Name */}
      <TextField
        id="outlined-full-width"
        label="Program Name"
        placeholder="Program Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />

      <TextField
        id="outlined-multiline-static"
        label="About the Program"
        multiline
        rows={6}
        style={{width: "100%"}}
        placeholder="Describe your program"
        variant="outlined"
      />

      {/* Region */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"

          label="Region"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      {/* City */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"

          label="City"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      {/* Country */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"

          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      {/* NGO Name - DISABLED */}
      <TextField
        id="outlined-read-only-input"
        label="NGO Name"
        defaultValue="World Wide Food"
        InputProps={{
          readOnly: true,
        }}
        variant="outlined"
        margin="normal"
        fullWidth
      />

      {/* AUTO POPULATED to "ACTIVE" */}
      {/* Program Status */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Program Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"

          label="Program Status"
        >
          <MenuItem value={10}>Active</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}