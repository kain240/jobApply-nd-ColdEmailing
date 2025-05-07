import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowUpManager = () => {
    const [followUps, setFollowUps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowUps = async () => {
            try {
                const response = await axios.get('/api/follow-ups'); // Adjust the endpoint as necessary
                setFollowUps(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowUps();
    }, []);

    const handleFollowUp = async (followUpId) => {
        try {
            await axios.post(`/api/follow-ups/${followUpId}/send`); // Adjust the endpoint as necessary
            alert('Follow-up email sent successfully!');
        } catch (err) {
            alert('Error sending follow-up email: ' + err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Follow-Up Manager</h2>
            <ul>
                {followUps.map(followUp => (
                    <li key={followUp.id}>
                        <p>{followUp.message}</p>
                        <button onClick={() => handleFollowUp(followUp.id)}>Send Follow-Up</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowUpManager;