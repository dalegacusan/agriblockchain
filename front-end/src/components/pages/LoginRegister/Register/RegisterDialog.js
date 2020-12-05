import React, { useContext } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from '../../../global/Header/ListItemLink';
import { RegisterDialogContext } from '../../../global/Contexts/RegisterDialogContext'

export default function RegisterDialog() {

  const { openRegisterDialog, setOpenRegisterDialog } = useContext(RegisterDialogContext)

  return (
    <div>
      <Dialog aria-labelledby="RegisterDialogTitle" open={openRegisterDialog}>
          <DialogTitle id="RegisterDialogTitle">
            Register As
          </DialogTitle>
          <DialogContent id="RegiserDialogContent">
            <List>
              <ListItemLink to='/register/corporation' onClick={() => setOpenRegisterDialog(false)}>
                <ListItemText primary="Sponsor / Corporation" />
              </ListItemLink>
              <ListItemLink to='/register/ngo' onClick={() => setOpenRegisterDialog(false)}>
                <ListItemText primary="NGO" />
              </ListItemLink>
              <ListItemLink to='/register/individual' onClick={() => setOpenRegisterDialog(false)}>
                <ListItemText primary="Individual" />
              </ListItemLink>
              <ListItemLink to='/register/farmer' onClick={() => setOpenRegisterDialog(false)}>
                <ListItemText primary="Farmer" />
              </ListItemLink>
            </List>
          </DialogContent>
      </Dialog>
    </div>
  )
}