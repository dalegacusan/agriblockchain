import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "20px"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Farmers(props) {
  const { farmers } = props;

  const classes = useStyles();

  return (
    <div>
      {
        farmers.map(farmer => {
          const { id, firstName, lastName, lastOnline, location, preferredModeOfCommunication, produce } = farmer;
          return (

            <Card key={id} className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {lastOnline}
                </Typography>
                <Typography variant="h5" component="h2">
                  {firstName} {lastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {location}
                </Typography>
                <Typography variant="body2" component="p">
                  {
                    produce.map((produce, i) => {
                      return (
                        <span key={i}>{produce}, </span>
                      );
                    })
                  }
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Choose this farmer</Button>
              </CardActions>
            </Card>
          );
        })
      }
    </div>
  )
}