import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Contexts
// Components
// Pages
// CSS
import styles from './footer.module.css';

export default function Footer() {
	return (
		<Grid item xs={12} className={styles.footer}>
			<p>Footer</p>
		</Grid>
	);
}