import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function ProgramFavorites() {
  return (
    <div>
      <p>Active Program</p>

      {/* Brings user to the Program Profile page */}
      <p><a href="/">Active Program Name</a></p>
      <p>Status: <span><i>Active, Cancelled, Completed</i></span></p>
      <p>Stage: <span><i>Funding, Procurement, Execution</i></span></p>

      <div style={{ width: "80%", display: "inline-block" }}>
        <BorderLinearProgress variant="determinate" value={60} />
      </div>
      <span>60%</span>

      <p>Funding Status: <span>Php 70,000 of 100,000</span></p>
    </div>
  );
}