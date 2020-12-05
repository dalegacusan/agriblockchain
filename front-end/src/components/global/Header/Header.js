import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from './ListItemLink';
import ListItem from '@material-ui/core/ListItem';

import { RegisterDialogContext } from '../Contexts/RegisterDialogContext';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    minWidth: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    minWidth: drawerWidth,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { setOpenRegisterDialog } = useContext(RegisterDialogContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chooseRegisterType = () => {
    handleDrawerClose()
    setOpenRegisterDialog(true)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bay-ANI-han
          </Typography>
          <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink to='/' onClick={handleDrawerClose}>
            <ListItemText primary='Home' />
          </ListItemLink>
          <ListItemLink to='/login' onClick={handleDrawerClose}>
            <ListItemText primary='Login' />
          </ListItemLink>
          <ListItem button onClick={chooseRegisterType}>
            <ListItemText primary='Register' />
          </ListItem>
          <ListItemLink to='/programs' onClick={handleDrawerClose}>
            <ListItemText primary='Programs' />
          </ListItemLink>
          <ListItemLink to='/about' onClick={handleDrawerClose}>
            <ListItemText primary='About us' />
          </ListItemLink>
        </List>
      </Drawer>
    </div>
  );
}