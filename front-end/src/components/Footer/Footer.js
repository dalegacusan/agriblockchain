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
		<Grid container className={styles.footer}>
			<Grid item xs={6}>
				<p>Bayanihan</p>
				<p>
					A platform that connects farmers directly to end consumers <br />
					via a blockchain-enabled crowdfunding platform.
				</p>
				<p>© 2020 Team Agriblockchain. All rights reserved.</p>
			</Grid>
			<Grid item xs={6}>
				<p>
					<a href='https://youtu.be/y8MjU8664Lo' target='_blank' rel='noreferrer'>
						<img src='/images/youtube.svg' alt='youtube' className={styles.footerIcon} />
					</a>
				</p>
				<p>Report a bug.</p>
				<p>
					<a href='https://github.com/dalegacusan/agriblockchain'>https://github.com/dalegacusan/agriblockchain</a>
				</p>
			</Grid>
		</Grid>
	);
}