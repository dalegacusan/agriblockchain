import React from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// Contexts
// Components
// Pages
// CSS
import styles from './pagenotfound.module.css';

export default function PageNotFound() {
	return (
		<Container component={Box} maxWidth="md" my={1} py={2}>
			<Box display="flex" justifyContent="center">
				<Box>
					<p className={styles.header}>404</p>
					<p className={styles.subHeader}>Page Not Found</p>
					<p className={styles.description}>
						The Page you are looking for doesn't exist or another <br />
						error occured. Go to <a href="/">Home Page</a>.
					</p>
				</Box>
			</Box>
		</Container>
	);
}
