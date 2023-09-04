// Import the CSS file for styling
import "./Table.css";

// Define the Table component
function Table(records) {
	// Extract the records data from the 'records' prop or initialize it as an empty array
	const recordsNN =
		records?.records === null || records?.records === undefined
			? []
			: records.records;

	// Render the table component
	return (
		<div className="table">
			<header>
				<h1>Records</h1>
			</header>
			<table>
				{/* Define the table header row */}
				<tr>
					<th>Name</th>
					<th>Temperature</th>
					<th>Symptoms</th>
					<th>Had contact</th>
				</tr>
				<tbody>
					{/* Map through the 'recordsNN' array and render table rows for each record */}
					{recordsNN.map((record) => {
						return (
							<tr key={record.id}>
								<td>{record.name}</td> <td>{record.temperature}</td>{" "}
								<td>{record.symptoms === 1 ? "true" : "false"}</td>{" "}
								<td>{record.contactWith === 1 ? "true" : "false"}</td>{" "}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

// Export the Table component
export default Table;
