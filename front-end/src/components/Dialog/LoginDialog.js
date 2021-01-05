import React, { useContext, useState, Fragment, useEffect } from 'react';
import axios from 'axios';

// MaterialUI
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
// Contexts
import { LoginDialogContext } from '../../contexts/LoginDialogContext';
// Components
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	avatar: {
		color: theme.palette.secondary.contrastText,
		backgroundColor: theme.palette.secondary.main,
		textTransform: 'uppercase',
	},
	loginItem: {

	}
}));

export default function LoginDialog() {
	const classes = useStyles()

	const { openLoginDialog, setOpenLoginDialog, setLoginData } = useContext(LoginDialogContext)
	const [tempData, setTempData] = useState({
		type: '',
		uid: '',
		displayName: '',
		username: '',
		walletBalance: 0,
	})
	const [allNgos, setAllNgos] = useState([]);
	const [allFarmers, setAllFarmers] = useState([]);
	const [allSponsors, setAllSponsors] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState('');

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
		setSelectedIndex('')
		setTempData({
			username: '',
			type: '',
			uid: '',
			balance: 0,
		})
	}

	const handleSubmit = () => {
		let balance = 0;
		if (tempData.type === 'sponsor' || tempData.type === 'farmer') {
			axios.get(`/api/${tempData.type}/${tempData.uid}/balance`)
				.then(res => {
					balance = res.data.balance;
					setLoginData({
						...tempData,
						balance,
					});
					localStorage.setItem('loginCreds', JSON.stringify({
						...tempData,
						balance: res.data.balance,
					}));
				})
				.catch(err => {
					console.error(err);
					localStorage.setItem('loginCreds', JSON.stringify({
						...tempData,
						balance: 0,
					}));
				})
		} else {
			setLoginData(tempData)
			localStorage.setItem('loginCreds', JSON.stringify(tempData));
		}
		setOpenLoginDialog(false)
	}

	useEffect(() => {
		axios.get(`/api/ngo/all`)
			.then(res => {
				setAllNgos(res.data)
			})
			.catch(err => console.error(err))
		axios.get(`/api/farmer/all`)
			.then(res => {
				setAllFarmers(res.data)
			})
			.catch(err => console.error(err))
		axios.get(`/api/sponsor/all`)
			.then(res => {
				setAllSponsors(res.data)
			})
			.catch(err => console.error(err))
	}, [openLoginDialog])

	return (
		<Dialog aria-labelledby='LoginDialogTitle' open={openLoginDialog} fullWidth maxWidth='xs'>
			<DialogTitle id='LoginDialogTitle'>
				Log In
			</DialogTitle>
			<DialogContent id='RegiserDialogContent'>
				<DialogContentText>
					To log in to the system, select a user.
				</DialogContentText>
				<Box>
					<Typography variant='subtitle2' component='h6'>
						NGO
					</Typography>
					{allNgos.length > 0 && allNgos.map((ngo, index) => {
						const { id: ngoId, loginDetails, about } = ngo;
						const { username } = loginDetails;
						const { ngoName } = about;
						return (
							<List component='div' key={index}>
								<ListItem
									button
									selected={selectedIndex === ngoId}
									onClick={(e) => {
										handleListItemClick(e, ngoId, {
											type: 'ngo',
											displayName: ngoName,
											username,
											uid: ngoId,
										})
									}}
									style={{ borderRadius: 8 }}
								>
									<ListItemIcon>
										<Avatar className={classes.avatar}>
											{ngoName !== undefined && ngoName[0]}
										</Avatar>
									</ListItemIcon>
									<ListItemText
										primary={ngoName}
										secondary={(
											<>
												<Typography variant='caption'>
													System ID:
													{' '}
													{ngoId}
												</Typography>
											</>
										)}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</List>
						)
					})}
				</Box>
				<Box>
					<Typography variant='subtitle2' component='h6'>
						Farmer
					</Typography>
					{allFarmers.length > 0 && allFarmers.map((farmer, index) => {
						const { id: farmerId, loginDetails, about } = farmer;
						const { username } = loginDetails;
						const { firstName, lastName } = about;
						return (
							<>
								<List component='div' key={index}>
									<ListItem
										button
										selected={selectedIndex === farmerId}
										onClick={(e) => {
											handleListItemClick(e, farmerId, {
												type: 'farmer',
												displayName: `${firstName} ${lastName}`,
												username,
												uid: farmerId,
											})
										}}
										style={{ borderRadius: 8 }}
									>
										<ListItemIcon>
											<Avatar className={classes.avatar}>
												{firstName !== undefined && firstName[0]}
											</Avatar>
										</ListItemIcon>
										<ListItemText
											primary={`${firstName} ${lastName}`}
											secondary={(
												<>
													<Typography variant='caption'>
														System ID:
														{' '}
														{farmerId}
													</Typography>
												</>
											)}
										/>
									</ListItem>
									<Divider variant='inset' component='li' />
								</List>
							</>
						)
					})}
				</Box>
				<Box>
					<Typography variant='subtitle2' component='h6'>
						Sponsor
					</Typography>
					{allSponsors.length > 0 && allSponsors.map((sponsor, index) => {
						const { id: sponsorId, loginDetails, about } = sponsor;
						const { username } = loginDetails;
						const { firstName, lastName } = about;
						return (
							<List component='div' key={index}>
								<ListItem
									button
									selected={selectedIndex === sponsorId}
									onClick={(e) => {
										handleListItemClick(e, sponsorId, {
											type: 'sponsor',
											displayName: `${firstName} ${lastName}`,
											username,
											uid: sponsorId,
										})
									}}
									style={{ borderRadius: 8 }}
								>
									<ListItemIcon>
										<Avatar className={classes.avatar}>
											{firstName !== undefined && firstName[0]}
										</Avatar>
									</ListItemIcon>
									<ListItemText
										primary={`${firstName} ${lastName}`}
										secondary={(
											<>
												<Typography variant='caption'>
													System ID:
													{' '}
													{sponsorId}
												</Typography>
											</>
										)}
									/>
								</ListItem>
								<Divider variant='inset' component='li' />
							</List>
						)
					})}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
					color='primary'
					disabled={selectedIndex === ''}
				>
					Log In
				</Button>
			</DialogActions>
		</Dialog>
	)
}