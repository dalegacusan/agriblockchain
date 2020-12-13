import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
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
  const { title } = props;
  const { image } = props;
  const classes = useStyles();

  return (
    <Box my={2} mx={2}>
      <Card>
        <CardContent>
          <Box px={1} py={2} display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
            <Box px={5} justifyContent='space-between'>
              <img src={image} alt='icon' width={100} />
            </Box>
            <Box px={1} justifyContent='space-between'>
              <Typography variant="h5" component="p">
                {title}
              </Typography>
              <Typography variant="body2" component="p">
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
