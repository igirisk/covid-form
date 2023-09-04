// Import React hooks and CSS file
import { useEffect, useState } from "react";
import "./App.css";

// Import components
import CovidForm from "./CovidForm";
import Table from "./Table";

// Define the main App component
function App() {
	// Initialize state variable for records
	const [records, setRecords] = useState(null);

	// Use useEffect hook to fetch records when the component mounts
	useEffect(() => {
		// Check if records are null (initial state)
		if (records === null) {
			// Send a GET request to retrieve records from the server
			fetch("/records", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				// Parse the response as JSON and update the records state
				response.json().then((rows) => {
					setRecords(rows);
				});
			});
		}
	}, []); // The empty dependency array ensures this effect runs only once when the component mounts

	// Render the main application
	return (
		<div className="App">
			<div className="content">
				{/* Render the CovidForm component and pass a callback function (setRecords) to update records */}
				<CovidForm setRecords={setRecords} />

				{/* Render the Table component and pass the records data */}
				<Table records={records} />
			</div>
		</div>
	);
}

// Export the App component
export default App;
