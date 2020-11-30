import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';

function LandingPage() {

    return (
        <div>
            <h1>Hello world!</h1>
            <h3>This page is a work in progress</h3>
            <Button variant="contained" color="primary">
                <MaterialLink component={Link} color="inherit" to="/farmers">
                    View Farmers
                </MaterialLink>
            </Button>
        </div>
    )
}

export default LandingPage