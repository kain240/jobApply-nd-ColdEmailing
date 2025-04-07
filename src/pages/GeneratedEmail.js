import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GeneratedEmail.css";

function GeneratedEmail() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { company, title, role, resume } = state || {};

    const [emailContent, setEmailContent] = useState("");
    const [name, setName] = useState("Your Name");

    useEffect(() => {
        if (!company || !title || !role) return;

        const generated = `Dear Hiring Team at ${company},

I hope this message finds you well. I am writing to express my interest in the ${title} position (${role}) at ${company}.

With a strong passion for software development and experience that aligns with this role, I believe I could make valuable contributions to your team.

[Relevant skills and projects from resume would be dynamically added here.]

Thank you for considering my application. I look forward to the opportunity to discuss my candidacy with you.

Best regards,  
${name}`;

        setEmailContent(generated);
    }, [company, title, role, name]);

    const handleSend = () => {
        // You can replace this with your backend API call
        alert("Email has been sent to the hiring team!");
    };

    if (!company || !title || !role) {
        return (
            <div className="email-generated-container">
                <h2>Missing Information</h2>
                <p>Some required information is missing. Please fill out the form again.</p>
                <button className="send-btn" onClick={() => navigate("/")}>
                    Go Back →
                </button>
            </div>
        );
    }

    return (
        <div className="email-generated-container">
            <h2>Email Generated</h2>

            <label htmlFor="name">Your Name</label>
            <input
                id="name"
                className="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />

            <div className="email-box">
                <pre>{emailContent}</pre>
            </div>

            <button className="send-btn" onClick={handleSend}>
                Send mail to the Recipient →
            </button>
        </div>
    );
}

export default GeneratedEmail;
