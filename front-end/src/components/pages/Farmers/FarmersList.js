import React, { useState, useEffect } from "react";
import Farmer from "./Farmer";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

function FarmersList() {

  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    axios.get('/api/farmers')
      .then(res => {
        setFarmers([...farmers, ...res.data]);
      });
  }, []);

  return (
    <div>
      {
        farmers.length !== 0
          ?
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Farmer farmers={farmers} />
              {/* Will change to actual grid items per farmers next time */}
            </Grid>
          </Grid>
          : <LoadingScreen />
      }
    </div>
  );
}

export default FarmersList;
