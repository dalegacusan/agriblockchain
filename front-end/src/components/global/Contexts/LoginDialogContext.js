import React, { createContext, useState, useEffect } from 'react';

export const LoginDialogContext = createContext(null);

export const LoginDialogProvider = props => {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        type: '',
        uid: '',
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

    return (
        <LoginDialogContext.Provider 
            value={{ openLoginDialog, setOpenLoginDialog, loginData, setLoginData }}>
            {props.children}
        </LoginDialogContext.Provider>
    )
}