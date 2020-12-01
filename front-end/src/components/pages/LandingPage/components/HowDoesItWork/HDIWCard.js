import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
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
});

export default function HDIWCard(props) {
  const { description } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <img src="/images/dummy_icon.png" style={{ float: "right" }} alt="icon" width="100" />

              <Typography variant="body2" component="p">
                <span style={{ display: "inline-block", width: "60%" }}>
                  {description}
                </span>
              </Typography>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>

  );
}
