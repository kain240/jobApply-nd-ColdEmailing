import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GeneratedEmail.css";
import api from "../api/api";

function GeneratedEmail() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const { company, title, role, resume } = state || {};
    const [emailContent, setEmailContent] = useState("");
    const [name, setName] = useState("Your Name");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!company || !title || !role) return;

        const template = `Dear Hiring Team at ${company},

I hope this message finds you well. I am writing to express my interest in the ${title} position (${role}) at ${company}.

With a strong passion for software development and experience that aligns with this role, I believe I could make valuable contributions to your team.

[Relevant skills and projects from resume would be dynamically added here.]

Thank you for considering my application. I look forward to the opportunity to discuss my candidacy with you.

Best regards,  
${name}`;

        setEmailContent(template);
    }, [company, title, role, name]);

    const handleSend = async () => {
        if (!emailContent || !resume) {
            setError("Missing email content or resume. Please go back and complete the form.");
            return;
        }

        try {
            setSending(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("company", company);
            formData.append("title", title);
            formData.append("role", role);
            formData.append("emailContent", emailContent);
            formData.append("resume", resume);

            // Actual API call
            // const res = await api.post("/emails/send", formData);

            // Placeholder
            alert("Email has been sent to the hiring team!");

            // Optionally navigate or reset
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Failed to send the email. Please try again later.");
        } finally {
            setSending(false);
        }
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
            <h2>Email Preview</h2>

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

            {error && <p className="error-text">{error}</p>}

            <button
                className="send-btn"
                onClick={handleSend}
                disabled={sending}
            >
                {sending ? "Sending..." : "Send mail to the Recipient →"}
            </button>
        </div>
    );
}

export default GeneratedEmail;
