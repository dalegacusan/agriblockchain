import React from 'react';

export default function ProgramStatistics(props) {
	const { currentUser } = props;

	let toDisplay;

	if (currentUser === "ngo") {
		toDisplay = (
			<>
				<span>
					<span>0</span>
					Total
				</span>
				<span>
					<span>0</span>
					Active
				</span>
				<span>
					<span>0</span>
					Completed
				</span>
			</>
		);
	} else if (currentUser === "corporation") {
		toDisplay = (
			<>
				<p>
					Total Programs Sponsored:
					<span>0</span>
				</p>
				<p>
					Active Programs:
					<span>0</span>
				</p>
				<p>
					Completed Programs:
					<span>0</span>
				</p>
			</>
		);
	} else if (currentUser === "individual") {
		toDisplay = (
			<>
				<p>
					Total Programs Sponsored:
					<span>0</span>
				</p>
			</>
		);
	} else if (currentUser === "farmer") {
		toDisplay = (
			<>
				<p>
					Total Programs Participated:
					<span>0</span>
				</p>
				<p>
					Active Programs:
					<span>0</span>
				</p>
				<p>
					Completed Programs:
					<span>0</span>
				</p>
			</>
		);
	}

	return (
		<div>
			<p>Program Statistics</p>

			{toDisplay}
		</div>
	);
}