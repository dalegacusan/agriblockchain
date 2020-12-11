import React, { useContext, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { LoginDialogContext } from '../../../global/Contexts/LoginDialogContext';

export default function LoginDialog() {

  const { openLoginDialog, setOpenLoginDialog, setLoginData } = useContext(LoginDialogContext)
  const [ tempData, setTempData ] = useState({
    username: '',
    password: '',
    type: '',
    uid: '',
  })

  const handleChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    setLoginData(tempData)
    localStorage.setItem('loginCreds', JSON.stringify(tempData));
    setOpenLoginDialog(false)
  }

  return (
    <div>
      <Dialog aria-labelledby="LoginDialogTitle" open={openLoginDialog} fullWidth={true} maxWidth="xs">
          <DialogTitle id="LoginDialogTitle">
            Log In
          </DialogTitle>
          <DialogContent id="RegiserDialogContent">
            <Box mb={2}>
              <TextField
                autoFocus
                id="username"
                name="username"
                label="Username"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={tempData.username}
              />
            </Box>
            <Box mb={2}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={tempData.password}
              />
            </Box>
            <Box mb={2}>
              <FormControl variant="outlined">
                <InputLabel id="select-user-type">Type</InputLabel>
                <Select
                  labelId="select-user-type"
                  id="usertype"
                  name="type"
                  label="Type"
                  style={{ minWidth: 100 }}
                  onChange={handleChange}
                  value={tempData.type}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="farmer">Farmer</MenuItem>
                  <MenuItem value="ngo">NGO</MenuItem>
                  <MenuItem value="individual">Sponsor - Individual</MenuItem>
                  <MenuItem value="corporation">Sponsor - Corporation</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <TextField
                id="uid"
                name="uid"
                label="Unique ID"
                type="uid"
                fullWidth
                variant="outlined"
                onChange={handleChange}
                value={tempData.uid}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLoginDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Log In
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}