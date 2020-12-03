import React from "react";
import Slideshow from './components/Slideshow';
import HowDoesItWork from './components/HowDoesItWork/HowDoesItWork';
import Programs from './components/Programs/Programs.js';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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

function LandingPage() {
    const classes = useStyles();

    return (
        <Box>
            <Slideshow classes={classes} />
            <Box my={1} py={2} maxWidth='100vw'>
                <Typography component='h1' variant='h4' className={classes.centerText}>
                    How does it work?
                </Typography>
                <HowDoesItWork classes={classes} />
            </Box>
            <Box my={1} py={2} maxWidth='100vw'>
                <Typography component='h1' variant='h4' className={classes.centerText}>
                    Programs
                </Typography>
                <Programs />
            </Box>
        </Box>
    )
}

export default LandingPage