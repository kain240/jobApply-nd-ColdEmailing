import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, ArrowDown, ArrowUp } from 'lucide-react';
import ApplicationCard from '../components/ApplicationCard';

const JobApplications = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('dateApplied');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);

    // Fetch applications
    useEffect(() => {
        // In a real app, you'd fetch from your API
        const mockApplications = [
            {
                id: 1,
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
            },
            {
                id: 2,
                jobTitle: 'React Engineer',
                company: 'InnovateSoft',
                location: 'Remote',
                jobType: 'Full-time',
                salary: '$120,000 - $140,000',
                jobUrl: 'https://example.com',
                description: 'React position...',
                status: 'Interview',
                dateApplied: '2025-04-27',
                notes: 'Phone screen scheduled for next week'
            },
            {
                id: 3,
                jobTitle: 'UI Developer',
                company: 'WebSolutions',
                location: 'New York, NY',
                jobType: 'Contract',
                salary: '$100/hr',
                jobUrl: 'https://example.com',
                description: 'UI developer position...',
                status: 'Rejected',
                dateApplied: '2025-04-26',
                notes: 'Received rejection email'
            },
            {
                id: 4,
                jobTitle: 'Senior Frontend Engineer',
                company: 'StartupXYZ',
                location: 'Austin, TX',
                jobType: 'Full-time',
                salary: '$130,000 - $150,000',
                jobUrl: 'https://example.com',
                description: 'Senior frontend position...',
                status: 'Offer',
                dateApplied: '2025-04-25',
                notes: 'Received offer, considering'
            },
        ];

        setApplications(mockApplications);
        setFilteredApplications(mockApplications);
        setLoading(false);
    }, []);

    // Filter and sort applications
    useEffect(() => {
        let result = [...applications];

        // Filter by search query
        if (searchQuery) {
            result = result.filter(app =>
                app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by status
        if (filterStatus !== 'All') {
            result = result.filter(app => app.status === filterStatus);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'dateApplied') {
                return sortOrder === 'asc'
                    ? new Date(a.dateApplied) - new Date(b.dateApplied)
                    : new Date(b.dateApplied) - new Date(a.dateApplied);
            } else if (sortBy === 'company') {
                return sortOrder === 'asc'
                    ? a.company.localeCompare(b.company)
                    : b.company.localeCompare(a.company);
            } else if (sortBy === 'jobTitle') {
                return sortOrder === 'asc'
                    ? a.jobTitle.localeCompare(b.jobTitle)
                    : b.jobTitle.localeCompare(a.jobTitle);
            }
            return 0;
        });

        setFilteredApplications(result);
    }, [applications, searchQuery, filterStatus, sortBy, sortOrder]);

    const handleDelete = (id) => {
        // In a real app, you'd call your API to delete
        setApplications(applications.filter(app => app.id !== id));
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
                <Link
                    to="/applications/add"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <Plus size={18} />
                    <span>Add New</span>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                                placeholder="Search job title, company, location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-gray-500" />
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="All">All Status</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Withdrawn">Withdrawn</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="dateApplied">Date Applied</option>
                                    <option value="company">Company</option>
                                    <option value="jobTitle">Job Title</option>
                                </select>
                                <button
                                    onClick={toggleSortOrder}
                                    className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg"
                                >
                                    {sortOrder === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {loading ? (
                        <div className="text-center py-8">Loading applications...</div>
                    ) : filteredApplications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredApplications.map(application => (
                                <ApplicationCard
                                    key={application.id}
                                    application={application}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No applications found</p>
                            <Link
                                to="/applications/add"
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Plus size={18} />
                                <span>Add New Application</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobApplications;