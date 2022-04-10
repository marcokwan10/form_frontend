import React, { useState, Fragment } from "react";
import "./App.css";

function App() {
	const [courseA, setCourseA] = useState("");
	const [courseB, setCourseB] = useState("");
	const [courseC, setCourseC] = useState("");
	const [error, setError] = useState("");
	const [returningData, setReturningData] = useState("");

	const hasError = () => {
		const requiredCourse = "calculus";
		const userInput = [courseA?.toLowerCase(), courseB?.toLowerCase(), courseC?.toLowerCase()];
		return !userInput.includes(requiredCourse);
	};

	const handleSubmit = async (e) => {
		setError("");
		e.preventDefault();
		if (hasError()) {
			setError("You must register for calculus course.");
		} else {
			try {
				const body = { courseA, courseB, courseC };
				const response = await fetch("http://localhost:5001/form", {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body),
				});
				const { course_a, course_b, course_c } = await response.json();
				setReturningData(
					`You have successfully registered the following courses: ${course_a} ${course_b} ${course_c}.`
				);
				setCourseA("");
				setCourseB("");
				setCourseC("");
				setTimeout(() => {
					setReturningData("");
				}, 3000);
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit} className="form">
				<div className="form-row">
					<label className="form-label">Course A:</label>
					<input className="form-input" type="text" value={courseA} onChange={(e) => setCourseA(e.target.value)} />
				</div>
				<div className="form-row">
					<label className="form-label">Course B:</label>
					<input className="form-input" type="text" value={courseB} onChange={(e) => setCourseB(e.target.value)} />
				</div>
				<div className="form-row">
					<label className="form-label">Course C:</label>
					<input className="form-input" type="text" value={courseC} onChange={(e) => setCourseC(e.target.value)} />
				</div>
				{error && <p className="alert-danger">{error}</p>}
				{returningData && <p className="alert-success">{returningData}</p>}
				<button type="submit" className="btn btn-block">
					Submit
				</button>
			</form>
		</Fragment>
	);
}

export default App;
