import React from 'react';

export default function AboutProgram() {

	const programDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

	return (
		<div>
			<p>
				About
				<i>Program Name</i>
			</p>

			<p>{programDescription}</p>
		</div>

	);
}