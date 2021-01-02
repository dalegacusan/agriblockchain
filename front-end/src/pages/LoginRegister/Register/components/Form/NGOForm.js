import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import { RegistrationDataContext } from '../../../../../contexts/RegistrationDataContext';


const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: "0 0%",
		minWidth: "50%",
	},
}));

export default function NGOForm() {
	const classes = useStyles();

	const { openRegistrationData, setOpenRegistrationData } = useContext(RegistrationDataContext);

	const handleChange = (e) => {
		setOpenRegistrationData({
			...openRegistrationData,
			type: 'ngo',
			[e.target.name]: e.target.value,
		});
	}

	return (
		<form noValidate autoComplete="off">
			{/* NGO Name */}
			<TextField
				label="NGO Name"
				placeholder="NGO Name"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				id="name"
				name="name"
				value={openRegistrationData.name}
				onChange={handleChange}
			/>

			{/* Contact Number */}
			<TextField
				label="Contact Number"
				placeholder="Contact Number"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				id="contactNumber"
				name="contactNumber"
				type="number"
				value={openRegistrationData.contactNumber}
				onChange={handleChange}
			/>

			{/* Authorized Representative */}
			<TextField
				label="Authorized Representative"
				placeholder="Authorized Representative"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				id="representativeName"
				name="representativeName"
				onChange={handleChange}
				value={openRegistrationData.representativeName}
			/>

			<br />
			<br />
			<Divider variant="middle" />
			<br />

			{/* Address Line 1 */}
			<TextField
				label="Address Line 1"
				placeholder="Address Line 1"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				id="address1"
				name="address1"
				value={openRegistrationData.address1}
				onChange={handleChange}
			/>

			{/* Address Line 2 */}
			<TextField
				label="Address Line 2"
				placeholder="Address Line 2"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				id="address2"
				name="address2"
				value={openRegistrationData.address2}
				onChange={handleChange}
			/>

			{/* Region */}
			<br />
			<br />
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="region"
					name="region"
					value={openRegistrationData.region}
					label="Region"
					onChange={handleChange}
					defaultValue=""
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="region 1">Region 1</MenuItem>
					<MenuItem value="region 2">Region 2</MenuItem>
					<MenuItem value="region 3">Region 3</MenuItem>
				</Select>
			</FormControl>

			{/* City */}
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="city"
					name="city"
					value={openRegistrationData.city}
					label="City"
					onChange={handleChange}
					defaultValue=""
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="makati">Makati</MenuItem>
					<MenuItem value="poblacion">Poblacion</MenuItem>
					<MenuItem value="davao">Davao</MenuItem>
				</Select>
			</FormControl>

			{/* Country */}
			<br />
			<br />
			<FormControl variant="outlined" style={{ width: "100%" }}>
				<InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
				<Select
					labelId="demo-simple-select-outlined-label"
					id="country"
					name="country"
					value={openRegistrationData.country}
					label="Country"
					onChange={handleChange}
					defaultValue=""
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value="Philippines">Philippines</MenuItem>
					<MenuItem value="Australia">Australia</MenuItem>
					<MenuItem value="Nicaragua">Nicaragua</MenuItem>
				</Select>
			</FormControl>
		</form>
	);
}
