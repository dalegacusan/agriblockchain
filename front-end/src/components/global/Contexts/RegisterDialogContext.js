import React, { createContext, useState } from 'react';

export const RegisterDialogContext = createContext(null);

export const RegisterDialogProvider = props => {
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false)

    return (
        <RegisterDialogContext.Provider value={{openRegisterDialog, setOpenRegisterDialog}}>
            {props.children}
        </RegisterDialogContext.Provider>
    )
}