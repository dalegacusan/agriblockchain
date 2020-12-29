import React from 'react';
import HDIWCard from './HDIWCard';
import Box from '@material-ui/core/Box';

export default function HowDoesItWork() {

  return (
    <Box>
      <HDIWCard title="Opening a Program"
        description="Organizations publish their food and nutrition-related programs on Bayanihan where they can connect with sponsors and farmers."
        image="/images/01.svg" />
      <HDIWCard title="Sponsoring a Program"
        description="Registered Sponsors (Corporate or Individual) select which programs they would want to fund. While a program is still in the Crowdfunding Phase, Sponsors are free to add or revert their pledges."
        image="/images/02.svg" />
      <HDIWCard title="Supporting Farmers"
        description="Partner farmers can select the programs they want to participate in. When participating in a program, 
      the farmer commits to deliver a specified amount of produce and sets the prices. 
      Organizations transfer the payments upon receipt of the produce."
        image="/images/03.svg" />
      <HDIWCard title="Why join us"
        description="By utilizing blockchain technology, Bayanihan offers a convenient and transparent platform."
        image="/images/blockchain.svg" />
    </Box>
  );
}
