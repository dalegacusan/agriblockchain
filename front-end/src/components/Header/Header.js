import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

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
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { useConfirm } from 'material-ui-confirm';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemLink from './ListItemLink';
import logo from './logo_01.svg';
// Contexts
import { RegisterDialogContext } from '../../contexts/RegisterDialogContext';
import { LoginDialogContext } from '../../contexts/LoginDialogContext';

// Components
// Pages
// CSS
import './header.css';

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
	const [loggedIn, setLoggedIn] = useState(false);
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
			setLoggedIn(true);
		} else {
			// not logged in
			setLoggedIn(false);
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
					<Typography variant="h6" className={`${classes.title} header_logo`}>
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
							<Box mx={1} pr={1} borderRight="1px solid #efefef">
								{
									loggedIn
										? (
											<Link component={RouterLink} to={`/profile/${loginData.uid}`} style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.87)' }}>
												<List component='div' style={{ padding: 0 }} className='header_name_balance'>
													<ListItem
														button
														style={{ borderRadius: 8 }}
													>
														<ListItemIcon>
															<Avatar className={classes.avatar}>
																{loginData.displayName && loginData.displayName !== '' ? loginData.displayName.substring(0, 2) : ''}
															</Avatar>
														</ListItemIcon>
														{
															loginData.type === 'ngo'
																? (
																	<ListItemText
																		primary={loginData.displayName}
																	/>
																)
																: (
																	<ListItemText
																		primary={loginData.displayName}
																		secondary={`Wallet: ${loginData.balance}`}
																	/>
																)
														}
													</ListItem>
												</List>
											</Link>
										)
										:
										null
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
					{
						loginData.type !== '' && loginData.uid !== ''
							? (
								<>
									<ListItemLink to={`/profile/${loginData.uid}`} onClick={handleDrawerClose}>
										<ListItemText primary='My Profile' />
									</ListItemLink>
								</>
							)
							: (
								<>
									<ListItemLink to='/login' onClick={handleDrawerClose}>
										<ListItemText primary='Login' />
									</ListItemLink>
									<ListItem button onClick={chooseRegisterType}>
										<ListItemText primary='Register' />
									</ListItem>
								</>
							)
					}
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