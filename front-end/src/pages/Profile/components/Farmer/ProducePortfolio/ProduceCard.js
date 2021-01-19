import React from 'react';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Contexts
// Components
// Pages
// CSS
const useStyles = makeStyles({
	root: {
		minWidth: 298,
		display: 'inline-block',
		marginRight: '10px'
	},
});

export default function ProduceCard(props) {
	const { produceName, producePrice, produceQuantity } = props;

	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{produceName}
						<Typography variant="body2" color="textSecondary" component="span">
							&nbsp;Php {producePrice} per
						</Typography>
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Remaining: {produceQuantity}kg
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}