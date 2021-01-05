import React from 'react';

// Components
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Programs from './components/Programs/Programs';
import HowDoesItWork from './components/HowDoesItWork/HowDoesItWork';
import Slideshow from './components/Slideshow';
// Contexts
// Pages
// CSS
const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	centerText: {
		textAlign: 'center',
	}
}));

export default function LandingPage() {
	const classes = useStyles();

	// const mint = () => {
	//     axios.post(`/api/crowdfunding/mint/`, {
	//         amount: 100000
	//     })
	//         .then(res => {
	//             alert("mint okay")
	//             console.log(res)
	//         })
	//         .catch(err => {
	//             alert("mint error")
	//             console.error(err)
	//         })
	// }

	return (
		<Box>
			{/* <Button
                onClick={mint}
                variant="contained"
            >
                Mint Yourself 100k (for Sponsor)
            </Button> */}
			<Slideshow classes={classes} />
			<Container component={Box} maxWidth="md" my={1} py={2}>
				<Box py={2}>
					<Typography component='h1' variant='h3' className={classes.centerText}>
						How does it work?
					</Typography>
				</Box>
				<HowDoesItWork classes={classes} />
			</Container>
			{/* 
			<Container component={Box} maxWidth="lg" my={1} py={2}>
				<Box pb={2}>
					<Typography component='h1' variant='h3' className={classes.centerText}>
						Programs
					</Typography>
				</Box>
				<Programs />
			</Container> */}
		</Box>
	)
}