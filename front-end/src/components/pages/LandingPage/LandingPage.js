import React, { useState, useEffect } from "react";
import Slideshow from './Slideshow';
import HowDoesItWork from './HowDoesItWork';
import Programs from './Programs.js';

import { makeStyles } from '@material-ui/core/styles';
import Header from '../../global/Header/Header';
import MaterialLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function LandingPage() {
    const classes = useStyles();

    return (
        <div>
            <Header />
            <div className={classes.root}>
                <Grid container spacing={1}>

                    <Slideshow classes={classes} />

                    <HowDoesItWork classes={classes} />

                    <Programs classes={classes} />

                    <Grid item xs={12}>
                        <Paper>
                            <Button variant="contained" color="primary">
                                <MaterialLink component={Link} color="inherit" to="/farmers">
                                    <span>View Farmers</span>
                                </MaterialLink>
                            </Button>
                        </Paper>
                    </Grid>

                </Grid>
            </div>


        </div>
    )
}

export default LandingPage