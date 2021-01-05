import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegisterDialog from '../Dialog/RegisterDialog';
import LoginDialog from '../Dialog/LoginDialog';
// MaterialUI
// Contexts
import { RegisterDialogProvider } from '../../contexts/RegisterDialogContext';
import { LoginDialogProvider } from '../../contexts/LoginDialogContext';
// Pages
// CSS

export default function Layout(props) {
	const { children } = props;

	return (
		<>
			<CssBaseline />
			<Router>
				<LoginDialogProvider>
					<RegisterDialogProvider>
						<Header />
						<RegisterDialog />
						<LoginDialog />
					</RegisterDialogProvider>

					{children}

					<Footer />
				</LoginDialogProvider>
			</Router>
		</>
	);

}