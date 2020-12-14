import Axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LoginDialogContext = createContext(null);

export const LoginDialogProvider = props => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        type: '',
        uid: '',
        walletBalance: 0,
    })

    useEffect(() => {
        if (localStorage.getItem('loginCreds') === undefined || 
            localStorage.getItem('loginCreds') === null ||
            localStorage.getItem('loginCreds') === ''
        ) {
            console.log('Not logged in!')
        } else {
            setLoginData(JSON.parse(localStorage.getItem('loginCreds')))
        }
    }, [])

    useEffect(() => {
        if (loginData.uid !== '' ) {
            if (loginData.type === 'corporation' || loginData.type === 'individual') {
                console.log('sponsor')
                axios.get(`/api/sponsors/${loginData.uid}`)
                    .then(res => setLoginData({ ...loginData, walletBalance: res.data.walletBalance }))
                    .catch(err => console.error(err))
            } else if (loginData.type === 'farmer') {
                console.log('farmer')
                axios.get(`/api/farmers/${loginData.uid}`)
                    .then(res => setLoginData({ ...loginData, walletBalance: res.data.walletBalance }))
                    .catch(err => console.error(err))
            } 
        } 
    }, [loginData.username])

    return (
        <LoginDialogContext.Provider 
            value={{ openLoginDialog, setOpenLoginDialog, loginData, setLoginData }}>
            {props.children}
        </LoginDialogContext.Provider>
    )
}