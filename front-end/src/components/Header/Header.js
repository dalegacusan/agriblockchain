import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// Components

// CSS
import logo from './logo_01.svg';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronRight';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from './ListItemLink';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { useConfirm } from 'material-ui-confirm';

// Contexts
import { RegisterDialogContext } from '../../contexts/RegisterDialogContext';
import { LoginDialogContext } from '../../contexts/LoginDialogContext';

// Pages

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1rem",
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
  avatar: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    textTransform: "uppercase",
  },
  logo: {
    minWidth: 130,
    maxWidth: 200,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const confirm = useConfirm();

  const [open, setOpen] = useState(false);
  const [loggedIn, setLogginIn] = useState(false);
  const { setOpenRegisterDialog } = useContext(RegisterDialogContext);
  const { setOpenLoginDialog, loginData, setLoginData } = useContext(LoginDialogContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const chooseRegisterType = () => {
    handleDrawerClose();
    setOpenRegisterDialog(true);
  };

  const handleLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleLogout = () => {
    confirm({
      description: 'This will log you out of the system.',
      title: 'Log out of Bayanihan?',
      cancellationButtonProps: {
        color: 'primary',
      }
    })
      .then(() => {
        setLoginData({
          username: '',
          password: '',
          type: '',
        });
        localStorage.removeItem('loginCreds');
        history.push('/');
      })
      .catch(() => console.log('Log out cancelled'));
  }

  useEffect(() => {
    if (loginData.type !== '' && loginData.uid !== '') {
      // logged in
      setLogginIn(true)
    } else {
      // not logged in
      setLogginIn(false)
    }
  }, [loginData])

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="default"
        style={{ color: "#0B5169" }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link component={RouterLink} to="/">
              <img src={logo} alt="Logo" className={classes.logo} />
            </Link>
          </Typography>
          <Box
            display={loggedIn ? "none" : "block"}
          >
            <Button color="inherit" onClick={handleLoginDialog}>
              Log In
            </Button>
          </Box>
          <Box
            display={loggedIn ? "block" : "none"}
          >
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar className={classes.avatar}>
                {loginData.username && loginData.username !== '' ? loginData.username.substring(0, 2) : ''}
              </Avatar>
              <Box mx={1} pr={1} borderRight="1px solid #efefef">
                <Typography >
                  {loginData.username && loginData.username !== '' ? loginData.username : ''}
                </Typography>
                {
                  !(loginData.type === 'ngo')
                    ?
                    <Typography variant="caption">
                      Wallet: {loginData.walletBalance}
                    </Typography>
                    : null
                }

              </Box>
              <Button color="inherit" onClick={handleLogout} size="small">
                Log Out
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
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