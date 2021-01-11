import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
	root: {
		display: 'inline-block',
		margin: 5,
		height: 310,
		width: 200
	},
	media: {
		width: 200,
		height: 200,
	},
	container: {
		flexGrow: 1,
	},
	logo: {
		height: 75,
	}

}));

const members = [
	{
		name: 'Dale',
		image: '/images/avatars/dale.png',
		text: 'Software Engineer',
	},
	{
		name: 'Dobi',
		image: '/images/avatars/dobi.png',
		text: 'QA Engineer',
	},
	{
		name: 'Minnie',
		image: '/images/avatars/minnie.png',
		text: 'Industrial Designer',
	},
	{
		name: 'Stephen',
		image: '/images/avatars/stephen.png',
		text: 'Software Engineer',
	}
]

function AboutPage() {
	const classes = useStyles();

	return (
		<Container className={classes.container} maxWidth="lg" component={Box} mt={5}>
			<Typography variant="h2" component="h1" gutterBottom>About Us</Typography>
			<Typography variant="h5" component="h1" gutterBottom>Hello! We are Team AgriBlockChain.</Typography>
			<Box my={5}>
				<Grid container justify="center" spacing={5}>
					<Grid item>
						{
							members.map((item, i) => <Item key={i} item={item} />)
						}
					</Grid>
				</Grid>
			</Box>
			<Box my={5}>
				<Grid container justify="center" spacing={5}>
					<img src="/images/abc_logo.svg" className={classes.logo} alt="abc_logo" />
				</Grid>
			</Box>
		</Container>
	)
}

export default AboutPage

function Item(props) {
	const { item } = props;
	const { image, name, text } = item;
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={image}
					title=""
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{text}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions />
		</Card>
	)
}