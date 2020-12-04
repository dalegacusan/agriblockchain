import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
  }
}));

export default function ProgramTimeline() {
  const classes = useStyles();

  return (
    <div>
      <p>Program Timeline</p>

      {/* Submission Date */}
      <TextField
        id="dateSubmission"
        name="dateSubmission"
        label="Submission Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

      {/* Funding START Date */}
      <TextField
        id="dateFundingStart"
        name="dateFundingStart"
        label="Funding START Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

      {/* Funding EBD Date */}
      <TextField
        id="dateFundingEnd"
        name="dateFundingEnd"
        label="Funding END Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

      {/* Procurement START Date */}
      <TextField
        id="dateProcureStart"
        name="dateProcureStart"
        label="Procurement START Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

      {/* Procurement END Date */}
      <TextField
        id="dateProcureEnd"
        name="dateProcureEnd"
        label="Procurement END Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

      {/* Program Date */}
      <TextField
        id="dateProgram"
        name="dateProgram"
        label="Program Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />

    </div>
  );
}