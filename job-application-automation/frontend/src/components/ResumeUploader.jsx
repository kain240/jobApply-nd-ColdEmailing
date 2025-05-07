import React, { useState } from 'react';
import axios from 'axios';

const ResumeUploader = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('/resume/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Resume uploaded successfully!');
        } catch (error) {
            setMessage('Error uploading resume. Please try again.');
        }
    };

    return (
        <div className="resume-uploader">
            <h2>Upload Your Resume</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResumeUploader;