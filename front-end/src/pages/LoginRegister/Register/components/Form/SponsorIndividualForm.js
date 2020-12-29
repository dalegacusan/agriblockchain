import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import { RegistrationDataContext } from '../../../../../contexts/RegistrationDataContext';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "0 0%",
    minWidth: "50%",
  },
}));

export default function SponsorIndividualForm() {
  const classes = useStyles();

  const { openRegistrationData, setOpenRegistrationData } = useContext(RegistrationDataContext);

  const handleChange = (e) => {
    setOpenRegistrationData({
      ...openRegistrationData,
      type: 'individual',
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form noValidate autoComplete="off">
      {/* First Name */}
      <TextField
        label="First Name"
        placeholder="First Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="firstName"
        name="firstName"
        value={openRegistrationData.firstName}
        onChange={handleChange}
      />

      {/* Middle Name */}
      <TextField
        label="Middle Name"
        placeholder="Middle Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="middleName"
        name="middleName"
        value={openRegistrationData.middleName}
        onChange={handleChange}
      />

      {/* Last Name */}
      <TextField
        label="Last Name"
        placeholder="Last Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="lastName"
        name="lastName"
        value={openRegistrationData.lastName}
        onChange={handleChange}
      />

      {/* Suffix */}
      <TextField
        label="Suffix"
        placeholder="Suffix"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="suffix"
        name="suffix"
        value={openRegistrationData.suffix}
        onChange={handleChange}
      />

      {/* Contact Number */}
      <TextField
        label="Contact Number"
        placeholder="Contact Number"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        type="number"
        id="contactNumber"
        name="contactNumber"
        value={openRegistrationData.contactNumber}
        onChange={handleChange}
      />

      {/* Email Address */}
      <TextField
        label="Email address"
        placeholder="Email Address"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="emailAddress"
        name="emailAddress"
        value={openRegistrationData.emailAddress}
        onChange={handleChange}
      />

      {/* Civil Status */}
      <br /><br />
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Civil Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Civil Status"
          id="civilStatus"
          name="civilStatus"
          value={openRegistrationData.civilStatus}
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married">Married</MenuItem>
          <MenuItem value="divorced">Divorced</MenuItem>
          <MenuItem value="widowed">Widowed</MenuItem>
        </Select>
      </FormControl>

      {/* Gender */}
      <br /><br />
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Gender"
          id="gender"
          name="gender"
          value={openRegistrationData.gender}
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="lgbtqia">LGBTQIA</MenuItem>
        </Select>
      </FormControl>

      <br /><br />
      <Divider variant="middle" />
      <br />

      {/* Address Line 1 */}
      <TextField
        label="Address Line 1"
        placeholder="Address Line 1"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="address1"
        name="address1"
        value={openRegistrationData.address1}
        onChange={handleChange}
      />

      {/* Address Line 2 */}
      <TextField
        label="Address Line 2"
        placeholder="Address Line 2"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        id="address2"
        name="address2"
        value={openRegistrationData.address2}
        onChange={handleChange}
      />

      {/* Region */}
      <br /><br />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="region"
          name="region"
          value={openRegistrationData.region}
          label="Region"
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="region 1">Region 1</MenuItem>
          <MenuItem value="region 2">Region 2</MenuItem>
          <MenuItem value="region 3">Region 3</MenuItem>
        </Select>
      </FormControl>

      {/* City */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="city"
          name="city"
          value={openRegistrationData.city}
          label="City"
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="makati">Makati</MenuItem>
          <MenuItem value="poblacion">Poblacion</MenuItem>
          <MenuItem value="davao">Davao</MenuItem>
        </Select>
      </FormControl>

      {/* Country */}
      <br /><br />
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="country"
          name="country"
          value={openRegistrationData.country}
          label="Country"
          onChange={handleChange}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Philippines">Philippines</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
          <MenuItem value="Nicaragua">Nicaragua</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
