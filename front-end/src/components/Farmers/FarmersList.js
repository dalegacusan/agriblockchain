import React, { useState, useEffect } from "react";
import Farmers from "./Farmers";
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
        farmers
          ?
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Farmers farmers={farmers} />
              {/* Will change to actual grid items per farmers next time */}
            </Grid>
          </Grid>
          : null
      }
    </div>
  );
}

export default FarmersList;
