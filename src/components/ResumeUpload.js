import React, { useState } from 'react';
import api from '../api/api';

function ResumeUpload() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setError("");
        setLoading(true);

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await api.post('/upload_resume', formData);
            alert('Upload successful');
        } catch (error) {
            console.error(error);
            alert('Upload failed');
        }

        setLoading(false);
    };

    return (
        <div>
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                accept=".pdf,.doc,.docx"
            />
            {error && <p className="error-text">{error}</p>}
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
}

export default ResumeUpload;
