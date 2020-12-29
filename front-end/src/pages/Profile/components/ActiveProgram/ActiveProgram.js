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

export default function ActiveProgram(props) {
  const { currentUser } = props;

  let toDisplay;

  if (currentUser === "ngo") {
    toDisplay = (
      <>

        {/* Brings user to the Program Profile page */}
        <p><a href="/">Active Program Name</a></p>
        <p>Status: <span><i>Active, Cancelled, Completed</i></span></p>
        <p>Stage: <span><i>Funding, Procurement, Execution</i></span></p>
        <div style={{ width: "80%", display: "inline-block" }}>
          <BorderLinearProgress variant="determinate" value={60} />
        </div>
        <span>60%</span>

        <p>Funding Status: <span>Php 70,000 of 100,000</span></p>
      </>
    );
  } else if (currentUser === "corporation") {
    toDisplay = (
      <>

        {/* Brings user to the Program Profile page */}
        <p><a href="/">Active Program Name</a></p>
        <p>Status: <span><i>Active, Cancelled, Completed</i></span></p>
        <p>Stage: <span><i>Funding, Procurement, Execution</i></span></p>
        <p>Date Funded: <span>12/3/2020</span></p>
        <p>Amount Funded: <span>20,000</span></p>
      </>
    );
  } else if (currentUser === "individual") {
    toDisplay = (
      <>

        {/* Brings user to the Program Profile page */}
        <p><a href="/">Active Program Name</a></p>
        <p>Status: <span><i>Active, Cancelled, Completed</i></span></p>
        <p>Stage: <span><i>Funding, Procurement, Execution</i></span></p>
        <p>Date Funded: <span>12/3/2020</span></p>
        <p>Amount Funded: <span>20,000</span></p>
      </>
    );
  } else if (currentUser === "farmer") {
    toDisplay = (
      <>

        {/* Brings user to the Program Profile page */}
        <p><a href="/">Active Program Name</a></p>
        <p>Status: <span><i>Active, Cancelled, Completed</i></span></p>
        <p>Stage: <span><i>Funding, Procurement, Execution</i></span></p>
        <p>Date Participated: <span>12/3/2020</span></p>
        <p>Expected Amount: <span>12,000</span></p>
      </>
    );
  } else if (currentUser === "program") {
    toDisplay = (
      <>

        <div style={{ width: "80%", display: "inline-block" }}>
          <BorderLinearProgress variant="determinate" value={60} />
        </div>
        <span>60%</span>

        <p>Funding Status: <span>Php 70,000 of 100,000</span></p>
      </>
    );
  }

  return (
    <div>
      {
        currentUser === "program"
          ? null
          : <p>Active Program</p>
      }

      {toDisplay}
    </div>
  );
}