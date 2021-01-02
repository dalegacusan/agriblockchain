import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';


import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { RegistrationDataContext } from '../../../../contexts/RegistrationDataContext';

export default function Agreement(props) {
	const { handleNext, classes } = props;

	const { setOpenRegistrationData } = useContext(RegistrationDataContext)
	const [accepted, setAccepted] = useState(false)

	const handleChange = (e) => {
		setAccepted(e.target.value)
	}

	const cancelReg = () => {
		setOpenRegistrationData({})
	}

	return (
		<Box mt={3}>
			<Typography component="h6" gutterBottom>Terms and Conditions</Typography>
			<Typography variant="body2" component="p" gutterBottom>These terms and conditions outline the rules and regulations for the use of Agriblockchain&apos;s Website, located at bayanihan.com.</Typography>
			<Typography variant="body2" component="p" gutterBottom>By accessing this website we assume you accept these terms and conditions.Do not continue to use Bayanihan if you do not agree to take all of the terms and conditions stated on this page.</Typography>
			<Typography variant="body2" component="p" gutterBottom>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this website and compliant to the Company’s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and ourselves.All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands.Any use of the above terminology or other words in the singular, plural, capitalization and / or he / she or they, are taken as interchangeable and therefore as referring to same.</Typography>

			<RadioGroup
				aria-label="t&c"
				name="t&c1"
				value={accepted}
				onChange={handleChange}
			>
				<FormControlLabel
					value="true"
					control={<Radio />}
					label={(
						<Typography
							style={{ fontSize: "14px" }}
						>
							I agree to the Terms & Conditions and Data Privacy Act
						</Typography>
					)}
				/>
			</RadioGroup>

			<Box display="flex" flexDirection="row-reverse">
				<Box p={1}>
					<Button
						className={classes.backButton}
						component={Link}
						to="/"
						onClick={cancelReg}
					>
						Cancel Registration
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={!accepted}
						onClick={handleNext}
					>
						Next
					</Button>
				</Box>
			</Box>
		</Box>
	);
}