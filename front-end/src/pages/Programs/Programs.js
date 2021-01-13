import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
// Contexts
import { LoginDialogContext } from '../../contexts/LoginDialogContext';
// Components
import ProgramCard from '../../components/ProgramCard/ProgramCard';
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		position: 'relative'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(5),
		[theme.breakpoints.down('md')]: {
			bottom: theme.spacing(4) * 1.3,
			right: theme.spacing(5) * 1.3,
		},
	},
}));

export default function Programs() {
	const classes = useStyles();

	const { loginData } = useContext(LoginDialogContext);
	const [programs, setPrograms] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get('/api/program/all')
			.then((res) => {
				const { data } = res;

				setLoading(false);
				setPrograms(data);
			})
			.catch(err => {
				console.log(err);

				setLoading(false);
			});
	}, []);

	return (
		<Container maxWidth='lg' component={Box} mt={5}>
			<Typography variant='h2' component='h1' gutterBottom>
				All Programs
			</Typography>
			<Box display={loginData.type === 'ngo' ? 'block' : 'none'}>
				<Link component={RouterLink} to='/program/create'>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						startIcon={<AddOutlinedIcon />}
					>
						Create Program
					</Button>
				</Link>
			</Box>

			<Box display={loginData.username === '' && loginData.type === '' ? 'block' : 'none'}>
				<Alert severity='info'>Log in to Bayanihan to get more details about the programs.</Alert>
			</Box>

			<Box my={3}>
				{
					loading
						? (
							<Box width='100%' textAlign='center'>
								<CircularProgress />
							</Box>
						)
						: (
							<Grid container spacing={2}>
								{
									programs.length !== 0
										?
										programs.map((program, index) => {
											const { id, status, stage, about, timeline } = program;
											const { programName, programDescription } = about;
											const { executionDate } = timeline;

											return (
												<Grid key={index} item xs={12} md={6} lg={4}>
													<ProgramCard
														programName={programName}
														programDate={moment(executionDate).format('dddd, MMMM Do YYYY')}
														programDescription={programDescription}
														programStage={stage}
														programStatus={status}
														programId={id}
													/>
												</Grid>
											)
										})
										: (
											<Box>
												<Alert severity='info'>
													No programs yet! If you are an NGO create a program now or wait for other NGOs to create programs.
												</Alert>
											</Box>
										)
								}
							</Grid>
						)
				}
			</Box>

		</Container>
	);
}
