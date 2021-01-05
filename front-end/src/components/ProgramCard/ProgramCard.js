import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Components
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// Contexts
import { LoginDialogContext } from '../../contexts/LoginDialogContext';
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	stage: {
		display: 'inline-block',
		backgroundColor: theme.palette.secondary.main,
		padding: '0.2rem 0.5rem',
		marginBottom: '0.5rem',
		color: theme.palette.secondary.contrastText,
	},
}));

export default function ProgramCard(props) {
	const {
		programName,
		programDate,
		programDescription,
		programStatus,
		programStage,
		programId
	} = props;
	const classes = useStyles();
	const location = useLocation();

	console.log(location.pathname);

	const { loginData } = useContext(LoginDialogContext);
	const [stage, setStage] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		switch (programStage) {
			case 'crowdfunding':
				setStage('Looking for sponsors');
				break;
			case 'procurement':
				setStage('Coordinating with farmers');
				break;
			case 'execution':
				setStage('Delivering to beneficiaries');
				break;
			case 'leftover':
				setStage('Cleaning up');
				break;
			default:
				setStatus('Stage unavailable');
		}
	}, [programStage])

	useEffect(() => {
		switch (programStatus) {
			case 'active':
				setStatus('Active');
				break;
			case 'completed':
				setStatus('Completed');
				break;
			case 'cancelled':
				setStatus('Cancelled');
				break;
			default:
				setStatus('Status unavailable');
		}
	}, [programStatus])

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="overline" color="primary">
					{status}
				</Typography>
				<Typography variant="h5" component="h2">
					{programName}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{programDate}
				</Typography>
				<Box className={classes.stage}>
					<Typography variant="subtitle2">
						{stage}
					</Typography>
				</Box>
				<Typography variant="body2" component="p" gutterBottom>
					{programDescription}
				</Typography>
			</CardContent>
			{
				true
					? (
						<CardActions>
							{
								loginData.username === '' && loginData.type === '' ? (
									<Button
										disabled
										size="small"
									>
										Learn More
									</Button>
								)
									: (
										<Link component={RouterLink} to={`/program/${programId}`} underline='none'>
											<Button
												size="small"
											>
												Learn More
											</Button>
										</Link>
									)
							}
						</CardActions>
					)
					: null
			}
		</Card>
	);
}