import React, { useState } from "react";
import "../styles/ColdEmailForm.css";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance (make sure to create it)

function ColdEmailForm() {
    const [step, setStep] = useState(1);
    const [resume, setResume] = useState(null);
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleNext = async () => {
        setError(null);

        if (step === 1) {
            if (!resume) {
                alert("Please upload your resume to proceed.");
                return;
            }

            // Step 1: Upload Resume
            try {
                setLoading(true);
                const formDataToSend = new FormData();
                formDataToSend.append("resume", resume);

                // Replace with your actual endpoint
                const response = await api.post("/upload_resume", formDataToSend);
                console.log("Resume upload response:", response.data);

                setLoading(false);
                setStep(2);
            } catch (err) {
                console.error(err);
                setError("Failed to upload resume. Try again.");
                setLoading(false);
            }

        } else if (step === 2) {
            const { company, title, role } = formData;

            if (!company || !title || !role) {
                alert("Please fill in all fields.");
                return;
            }

            try {
                setLoading(true);

                // Send formData to backend
                const res = await api.post("/generate_email", {
                    company,
                    title,
                    role,
                });

                console.log("Generated email response:", res.data);

                setLoading(false);

                // Navigate with formData and resume
                navigate("/email-preview", {
                    state: {
                        resume,
                        ...formData,
                        generatedEmail: res.data.generatedEmail || "", // optional
                    },
                });
            } catch (err) {
                console.error(err);
                setError("Failed to generate email.");
                setLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="cold-email-container">
            <h2>Want to Work at a Company You Truly Admire?</h2>
            <p>Take the First Step — Connect, Engage, and Impress with Cold Outreach</p>

            <div className="form-box">
                {loading && <p className="loading-msg">Processing...</p>}
                {error && <p className="error-msg">{error}</p>}

                {step === 1 && !loading && (
                    <>
                        <label htmlFor="resume-upload">Upload Your Resume</label>
                        <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        {resume && <p className="file-name">Uploaded: {resume.name}</p>}
                        <button className="next-btn" onClick={handleNext}>
                            Upload & Next →
                        </button>
                    </>
                )}

                {step === 2 && !loading && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Company Name (e.g., Google)"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Job Title (e.g., Software Engineer)"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            placeholder="Enter Job Role (e.g., SDE1, Intern)"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                        <button className="next-btn" onClick={handleNext}>
                            Generate Email →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ColdEmailForm;
