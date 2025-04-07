import React, { useState } from "react";
import "../styles/ColdEmailForm.css";
import { useNavigate } from "react-router-dom";

function ColdEmailForm() {
    const [step, setStep] = useState(1);
    const [resume, setResume] = useState(null);
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleNext = () => {
        if (step === 1 && !resume) {
            alert("Please upload your resume to proceed.");
            return;
        }

        if (step === 2) {
            // Navigate to the email preview page
            navigate("/email-preview", {
                state: {
                    resume,
                    ...formData,
                },
            });
            return;
        }

        setStep(step + 1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="cold-email-container">
            <h2>Want to Work at a Company You Truly Admire?</h2>
            <p>Take the First Step — Connect, Engage, and Impress with Cold Outreach</p>

            <div className="form-box">
                {step === 1 && (
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
                            Next Step →
                        </button>
                    </>
                )}

                {step === 2 && (
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
