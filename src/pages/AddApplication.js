import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';

const AddApplication = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        // In a real app, you'd call your API to save the application
        console.log('Submitting application:', formData);

        // For demo purposes, simulate a successful save
        setTimeout(() => {
            navigate('/applications');
        }, 500);
    };

    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Application</h1>
                <p className="text-gray-600">Keep track of your job applications</p>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <ApplicationForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default AddApplication;