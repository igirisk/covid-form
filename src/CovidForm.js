import { useState } from "react";

// Define the CovidForm component
const CovidForm = (setRecords) => {
	// Initialize state variables using the useState hook
	const [name, setName] = useState("");
	const [temperature, setTemperature] = useState("");
	const [symptoms, setSymptoms] = useState("");
	const [contactWtih, setContectWtih] = useState("");
	const [pending, setPending] = useState(false);

	// Event handler for symptoms input change
	const handleSysmptomsChange = (e) => {
		setSymptoms(e.target.value);
	};

	// Event handler for contactWtih input change
	const handlecontactWtihChange = (e) => {
		setContectWtih(e.target.value);
	};

	// Event handler for form submission
	const handleSubmit = () => {
		setPending(true); // Set pending state to true while the request is being made
		const payload = {
			name: name,
			temperature: parseFloat(temperature),
			symptoms: symptoms === "yes",
			contactWtih: contactWtih === "yes",
		};

		// Send a POST request to the server with the form data
		fetch("/records", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}).then(() => {
			// After the POST request is complete, send a GET request to retrieve updated records
			fetch("/records", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}).then((response) => {
				response.json().then((rows) => {
					setRecords(rows); // Update the records with the response data
					setPending(false); // Set pending state back to false
				});
			});
		});
	};

	// Render the form component
	return (
		<div className="covid-form">
			<header>
				<h1>HEALTH DEClARATION FORM</h1>
			</header>
			<form onSubmit={handleSubmit}>
				<div className="form-options">
					<label>
						<h3>Name:</h3>
						<input
							required
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
				</div>

				<div className="form-options">
					<label>
						<h3>Temperature:</h3>
						<input
							required
							type="number"
							step="0.1"
							value={temperature}
							onChange={(e) => setTemperature(e.target.value)}
						/>
					</label>
				</div>

				<div className="form-options">
					<h3>
						Do you have any of the following symptoms now or within the last 14
						days:
						<br />
						Cough, smell/test impairment, fever, breathing difficulties, body
						aches, headaches, fatigue, sore throat, diarrhea, runny nose
						<br /> (even if your symptoms are mild)?
					</h3>
					<label>
						<input
							required
							type="radio"
							name="symptoms"
							value="yes"
							checked={symptoms === "yes"}
							onChange={handleSysmptomsChange}
						/>{" "}
						<i>✓ Yes</i>
					</label>
					<label>
						<input
							type="radio"
							name="symptoms"
							value="no"
							checked={symptoms === "no"}
							onChange={handleSysmptomsChange}
						/>
						<i>X No</i>
					</label>
				</div>

				<div className="form-options">
					<h3>
						Have you been in contact with anyone who is suspected to have/has
						been diagnosed with Covid-19 within the last 14 days?
					</h3>
					<label>
						<input
							required
							type="radio"
							name="contactWtih"
							value="yes"
							checked={contactWtih === "yes"}
							onChange={handlecontactWtihChange}
						/>
						<i>✓ Yes</i>
					</label>
					<label>
						<input
							type="radio"
							name="contactWtih"
							value="no"
							checked={contactWtih === "no"}
							onChange={handlecontactWtihChange}
						/>
						<i>X No</i>
					</label>
				</div>

				<button disabled={pending}>{pending ? "Loading..." : "Submit"}</button>
			</form>
		</div>
	);
};

// Export the CovidForm component
export default CovidForm;
