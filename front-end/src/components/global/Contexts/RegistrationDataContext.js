import React, { createContext, useState } from 'react';

export const RegistrationDataContext = createContext(null);

export const RegistrationDataProvider = props => {
    const [openRegistrationData, setOpenRegistrationData] = useState({})

    return (
        <RegistrationDataContext.Provider 
            value={{openRegistrationData, setOpenRegistrationData}}
        >
            {props.children}
        </RegistrationDataContext.Provider>
    )
}