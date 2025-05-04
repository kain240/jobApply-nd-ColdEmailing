import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, ExternalLink, Mail } from 'lucide-react';

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'applied':
            return 'bg-blue-100 text-blue-800';
        case 'interview':
            return 'bg-purple-100 text-purple-800';
        case 'offer':
            return 'bg-green-100 text-green-800';
        case 'rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const ApplicationCard = ({ application, onDelete }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.jobTitle}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
            </div>

            <div className="mt-3 flex items-center text-sm text-gray-500">
                <span>{application.location}</span>
                <span className="mx-2">•</span>
                <span>{application.jobType}</span>
            </div>

            <div className="mt-3">
                <p className="text-sm text-gray-600">Applied on: {new Date(application.dateApplied).toLocaleDateString()}</p>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                    <Link
                        to={`/applications/edit/${application.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                        <Edit size={18} />
                    </Link>
                    <button
                        onClick={() => onDelete(application.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                <div className="flex space-x-2">
                    <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                        <ExternalLink size={18} />
                    </a>
                    <Link
                        to={`/cold-emails/new?company=${application.company}`}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                        <Mail size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;