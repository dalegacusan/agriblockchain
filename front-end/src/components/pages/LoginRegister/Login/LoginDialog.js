import React, { useContext, useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { LoginDialogContext } from '../../../global/Contexts/LoginDialogContext';


const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    textTransform: "uppercase",
  },
  loginItem: {

  }
}));

export default function LoginDialog() {
  const classes = useStyles()

  const { openLoginDialog, setOpenLoginDialog, setLoginData } = useContext(LoginDialogContext)
  const [ tempData, setTempData ] = useState({
    type: '',
    uid: '',
    walletBalance: 0,
  })
  const [ allNgos, setAllNgos ] = useState([]);
  const [ allFarmers, setAllFarmers ] = useState([]);
  const [ allSponsors, setAllSponsors ] = useState([]);
  const [ selectedIndex, setSelectedIndex ] = useState('');

  const handleListItemClick = (event, index, data) => {
    setSelectedIndex(index);
    setTempData(data)
  };

  const handleChange = (e) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setOpenLoginDialog(false)
    setSelectedIndex("")
    setTempData({
      username: '',
      type: '',
      uid: '',
      walletBalance: 0,
    })
  }

  const handleSubmit = () => {
    setLoginData(tempData)
    localStorage.setItem('loginCreds', JSON.stringify(tempData));
    setOpenLoginDialog(false)
  }

  useEffect(() => {
    axios.get(`/api/ngo`)
      .then(res => {
        setAllNgos(res.data)
      })
      .catch(err => console.error(err))
    axios.get(`/api/farmers`)
      .then(res => {
        setAllFarmers(res.data)
      })
      .catch(err => console.error(err))
    axios.get(`/api/sponsors`)
      .then(res => {
        setAllSponsors(res.data)
      })
      .catch(err => console.error(err))
  }, [openLoginDialog])

  return (
    <Dialog aria-labelledby="LoginDialogTitle" open={openLoginDialog} fullWidth={true} maxWidth="xs">
      <DialogTitle id="LoginDialogTitle">
        Log In
      </DialogTitle>
      <DialogContent id="RegiserDialogContent">
        <DialogContentText>
          To log in to the system, select a user.
        </DialogContentText>
        <Box>
          <Typography variant="subtitle2" component="h6">
            NGO
          </Typography>
          {allNgos.length > 0 && allNgos.map((ngo, index) => (
            <List component="div" key={index}>
              <ListItem button 
                        selected={selectedIndex === ngo.id} 
                        onClick={(e) => { 
                                  handleListItemClick(e, ngo.id, { 
                                    type: "ngo",
                                    username: ngo.ngoAbout.ngoName,
                                    uid: ngo.id,
                                   }) 
                                }}
                        style={{ borderRadius: 8 }}
              >
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    {ngo.ngoAbout.ngoName !== undefined && ngo.ngoAbout.ngoName[0]}  
                  </Avatar>    
                </ListItemIcon>
                <ListItemText 
                  primary={ngo.ngoAbout.ngoName}
                  secondary={
                    <Fragment>
                      <Typography variant="caption">
                        System ID: {ngo.id}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Box>
        <Box>
          <Typography variant="subtitle2" component="h6">
            Farmer
          </Typography>
          {allFarmers.length > 0 && allFarmers.map((farmer, index) => (
            <List component="div" key={index}>
              <ListItem button 
                        selected={selectedIndex === farmer.id} 
                        onClick={(e) => { 
                                  handleListItemClick(e, farmer.id, { 
                                    type: "farmer",
                                    username: farmer.farmerAbout.firstName,
                                    uid: farmer.id,
                                  }) 
                                }}
                        style={{ borderRadius: 8 }}
              >
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    {farmer.farmerAbout.firstName !== undefined && farmer.farmerAbout.firstName[0]}
                  </Avatar>    
                </ListItemIcon>
                <ListItemText 
                  primary={`${farmer.farmerAbout.firstName} ${farmer.farmerAbout.middleName} ${farmer.farmerAbout.lastName}`}
                  secondary={
                    <Fragment>
                      <Typography variant="caption">
                        System ID: {farmer.id}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Box>
        <Box>
          <Typography variant="subtitle2" component="h6">
            Sponsor
          </Typography>
          {allSponsors.length > 0 && allSponsors.map((sponsor, index) => (
            <List component="div" key={index}>
              <ListItem button 
                        selected={selectedIndex === sponsor.id} 
                        onClick={(e) => { 
                                  handleListItemClick(e, sponsor.id, { 
                                    type: "corporation",
                                    username: sponsor.sponsorAbout.corporationName,
                                    uid: sponsor.id,
                                  }) 
                                }}
                        style={{ borderRadius: 8 }}
              >
                <ListItemIcon>
                  <Avatar className={classes.avatar}>
                    {sponsor.sponsorAbout.corporationName !== undefined && sponsor.sponsorAbout.corporationName[0]}  
                  </Avatar>    
                </ListItemIcon>
                <ListItemText 
                  primary={sponsor.sponsorAbout.corporationName}
                  secondary={
                    <Fragment>
                      <Typography variant="caption">
                        System ID: {sponsor.id}
                      </Typography>
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary"
          disabled={ selectedIndex === "" ? true : false }
        >
          Log In
        </Button>
      </DialogActions>
    </Dialog>
  )
}