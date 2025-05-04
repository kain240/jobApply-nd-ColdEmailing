import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';

const EditApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you'd fetch the application from your API
        // For demo purposes, we'll simulate an API call
        const fetchApplication = async () => {
            try {
                // Mock data
                const mockApplication = {
                    id: parseInt(id),
                    jobTitle: 'Frontend Developer',
                    company: 'TechCorp',
                    location: 'San Francisco, CA',
                    jobType: 'Full-time',
                    salary: '$110,000 - $130,000',
                    jobUrl: 'https://example.com',
                    description: 'Frontend developer position...',
                    status: 'Applied',
                    dateApplied: '2025-04-28',
                    notes: 'Applied through company website'
                };

                setApplication(mockApplication);
            } catch (error) {
                console.error('Error fetching application:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    const handleSubmit = (formData) => {
        // In a real app, you'd call your API to update the application
        console.log('Updating application:', formData);

        // For demo purposes, simulate a successful update
        setTimeout(() => {
            navigate('/applications');
        }, 500);
    };

    if (loading) {
        return (
            <div className="px-4 py-6">
                <div className="text-center py-8">Loading application...</div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="px-4 py-6">
                <div className="text-center py-8">Application not found</div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
                <p className="text-gray-600">Update your job application details</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <ApplicationForm
                    initialData={application}
                    onSubmit={handleSubmit}
                    isEditing={true}
                />
            </div>
        </div>
    );
};

export default EditApplication;