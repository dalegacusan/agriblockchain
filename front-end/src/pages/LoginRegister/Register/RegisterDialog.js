import React, { useContext } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import ListItemLink from '../../../components/Header/ListItemLink';
import { RegisterDialogContext } from '../../../contexts/RegisterDialogContext';



export default function RegisterDialog() {

  const { openRegisterDialog, setOpenRegisterDialog } = useContext(RegisterDialogContext)

  return (
    <div>
      <Dialog aria-labelledby="RegisterDialogTitle" open={openRegisterDialog} fullWidth={true} maxWidth="xs">
        <DialogTitle id="RegisterDialogTitle">
          Register As
          </DialogTitle>
        <DialogContent id="RegiserDialogContent">
          <List>
            <ListItemLink to='/register/corporation' onClick={() => setOpenRegisterDialog(false)}>
              <ListItemText primary="Sponsor - Corporation" />
            </ListItemLink>
            <ListItemLink disabled to='/register/individual' onClick={() => setOpenRegisterDialog(false)}>
              <ListItemText primary="Sponsor - Individual" />
            </ListItemLink>
            <ListItemLink disabled to='/register/ngo' onClick={() => setOpenRegisterDialog(false)}>
              <ListItemText primary="NGO" />
            </ListItemLink>
            <ListItemLink disabled to='/register/farmer' onClick={() => setOpenRegisterDialog(false)}>
              <ListItemText primary="Farmer" />
            </ListItemLink>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRegisterDialog(false)} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}