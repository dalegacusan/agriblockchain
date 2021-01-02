import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const LoginDialogContext = createContext(null);

export const LoginDialogProvider = props => {
	const { children } = props;
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
		type: '',
		uid: '',
		balance: 0,
	})

	// Check if Local Storage has 'loginCreds' object
	// - Validates is a user is currently logged in
	useEffect(() => {
		if (
			localStorage.getItem('loginCreds') === undefined ||
			localStorage.getItem('loginCreds') === null ||
			localStorage.getItem('loginCreds') === ''
		) {
			console.log('User not logged in.');
		} else {
			setLoginData(JSON.parse(localStorage.getItem('loginCreds')));
		}
	}, [])

	// Set loginData state to current user
	// - Retrieves data from the database using the auto-filled UID
	useEffect(() => {
		if (loginData.uid !== '') {
			if (loginData.type === 'sponsor') {
				console.log('Sponsor is attempting to log in.');
				axios.get(`/api/sponsor/${loginData.uid}`)
					.then(res => setLoginData({ ...loginData, balance: res.data.balance }))
					.catch(err => console.error(err))
			} else if (loginData.type === 'farmer') {
				console.log('Farmer is attempting to log in.');
				axios.get(`/api/farmer/${loginData.uid}`)
					.then(res => setLoginData({ ...loginData, balance: res.data.balance }))
					.catch(err => console.error(err))
			}
		}
	}, [loginData.username])

	return (
		<LoginDialogContext.Provider
			value={{ openLoginDialog, setOpenLoginDialog, loginData, setLoginData }}
		>
			{children}
		</LoginDialogContext.Provider>
	)
}