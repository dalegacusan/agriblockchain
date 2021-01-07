import React from 'react';

import Button from '@material-ui/core/Button';

export default function ActionButtons() {
	return (
		<>
			<Button variant="contained" color="primary">Update Program Profile</Button>
			<Button variant="contained" color="primary">Change Status</Button>
			<Button variant="contained" color="primary">Move to Funding Stage</Button>
			<Button variant="contained" color="primary">Move to Procurement Stage</Button>
			<Button variant="contained" color="primary">Move to Execution Stage</Button>
			<Button variant="contained" color="primary">Mark program as Complete</Button>
		</>
	);
}