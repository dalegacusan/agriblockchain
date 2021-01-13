import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
// Contexts
// Components
// Pages
// CSS
import styles from './footer.module.css';

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
	},
}));

function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();

	return <Tooltip arrow classes={classes} {...props} />;
}

export default function Footer() {
	return (
		<>
			<Grid container className={styles.footer}>
				<Grid item xs={12} md={6} lg={6} className={styles.footer_grid_left}>
					<Box>
						<p>Bayanihan</p>
						<p>
							A platform that connects farmers directly to end consumers <br />
							via a blockchain-enabled crowdfunding platform.
						</p>
						<p>© 2020 Team Agriblockchain. All rights reserved.</p>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={6} className={styles.footer_grid_right}>
					<Box>
						<p>
							<a href='https://youtu.be/y8MjU8664Lo' target='_blank' rel='noreferrer'>
								<BootstrapTooltip title="Watch Product Demo" placement="right">
									<img src='/images/youtube.svg' alt='youtube' className={styles.footerIcon} />
								</BootstrapTooltip>
							</a>
						</p>
						<p>Report a bug</p>
						<a href='https://github.com/dalegacusan/agriblockchain' target='_blank' rel='noreferrer'>https://github.com/dalegacusan/agriblockchain</a>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

