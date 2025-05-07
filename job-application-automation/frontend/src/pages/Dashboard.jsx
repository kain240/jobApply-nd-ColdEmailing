import React, { useEffect, useState } from 'react';
import JobListings from '../components/JobListings';
import ResumeUploader from '../components/ResumeUploader';
import EmailDraft from '../components/EmailDraft';
import FollowUpManager from '../components/FollowUpManager';
import { getUserData } from '../services/api';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to access your dashboard.</div>;
    }

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}!</h1>
            <ResumeUploader />
            <JobListings />
            <EmailDraft />
            <FollowUpManager />
        </div>
    );
};

export default Dashboard;