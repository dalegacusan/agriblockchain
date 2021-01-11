import React from 'react';
import { withRouter } from 'react-router-dom';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Contexts
// Components
// Pages
// CSS

export default withRouter((props) => {
	const { currentUser } = props;

	return (
		<>
			<p>Hello</p>
			<p>Sponsor Profile Component</p>
		</>
	);
})