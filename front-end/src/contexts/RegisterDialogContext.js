import React, { createContext, useState } from 'react';

export const RegisterDialogContext = createContext(null);

export const RegisterDialogProvider = props => {
	const { children } = props;
	const [openRegisterDialog, setOpenRegisterDialog] = useState(false)

	return (
		<RegisterDialogContext.Provider value={{ openRegisterDialog, setOpenRegisterDialog }}>
			{children}
		</RegisterDialogContext.Provider>
	)
}