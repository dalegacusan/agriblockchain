import React from 'react';

// Components
// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// Contexts
// Pages
// CSS
const useStyles = makeStyles({
	fullWidth: {
		width: '98vw',
	},
	carouselImage: {
		width: '75%',
		minwidth: 500,
	}
});

export default function Slideshow() {
	const classes = useStyles();

	const items = [
		{
			image: '/images/carousel-01.png',
		},
		{
			image: '/images/carousel-02.png',
		},
		{
			image: '/images/carousel-03.png',
		}
	]

	return (
		<Grid container>
			<Grid item xs={12}>
				{/* @dev: Carousel is causing extra padding on landing page */}
				<Carousel interval={40000} animation='slide' className={classes.fullWidth}>
					{
						items.map((item, i) => <Item key={i} item={item} />)
					}
				</Carousel>
			</Grid>
		</Grid>
	);
}

function Item(props) {
	const { item } = props;
	const { image } = item;
	const classes = useStyles();

	return (
		<Box display='block' my={3} textAlign='center'>
			<img src={image} className={classes.carouselImage} alt="slideshow" />
		</Box>
	)
}