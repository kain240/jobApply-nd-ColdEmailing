import React from 'react';
import ResumeUploader from '../components/ResumeUploader';
import JobListings from '../components/JobListings';
import EmailDraft from '../components/EmailDraft';
import FollowUpManager from '../components/FollowUpManager';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Application Automation</h1>
            <ResumeUploader />
            <JobListings />
            <EmailDraft />
            <FollowUpManager />
        </div>
    );
};

export default Home;