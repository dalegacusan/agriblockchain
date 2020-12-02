import React, { useState, useEffect } from "react";
import Slideshow from './components/Slideshow';
import HowDoesItWork from './components/HowDoesItWork/HowDoesItWork';
import Programs from './components/Programs/Programs.js';

import { makeStyles } from '@material-ui/core/styles';
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
        <div className={classes.root}>
            <Grid container spacing={1}>

                <Slideshow classes={classes} />

                <div>
                    <h2 style={{ textAlign: "center" }}>How does it work?</h2>
                    <HowDoesItWork classes={classes} />
                </div>

                <div>
                    <h2 style={{ textAlign: "center" }}>Programs</h2>
                    <Programs />
                </div>

                {/* <Grid item xs={12}>
                        <Paper>
                            <Button variant="contained" color="primary">
                                <MaterialLink component={Link} color="inherit" to="/farmers">
                                    <span>View Farmers</span>
                                </MaterialLink>
                            </Button>
                        </Paper>
                    </Grid> */}

            </Grid>
        </div>
    )
}

export default LandingPage