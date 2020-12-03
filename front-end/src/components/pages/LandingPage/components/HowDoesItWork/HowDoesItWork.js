import React from 'react';
import HDIWCard from './HDIWCard';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export default function HowDoesItWork() {

  return (
    <Box>
      <HDIWCard description="Non-governmental organizations submits program funding or assistance request. Program will be published to the website" />
      <HDIWCard description="Registered Sponsors (Corporate or Individual) will select which program to fund. Once a program is funded, a request will be sent to the partner farmers" />
      <HDIWCard description="Partner farmers who wish to participate in the program needs to accept the crop request in the app" />
    </Box>
  );
}
