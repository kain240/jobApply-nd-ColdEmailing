import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, CheckCircle, XCircle, Clock, BarChart2 } from 'lucide-react';

import StatCard from '../components/StatCard';

const Dashboard = ({ user }) => {
    const [stats, setStats] = useState({
        totalApplications: 0,
        interviewsScheduled: 0,
        offersReceived: 0,
        rejections: 0,
        pendingResponses: 0,
        coldEmailsSent: 0
    });

    const [recentApplications, setRecentApplications] = useState([]);

    // Simulate fetching data from API
    useEffect(() => {
        // In a real app, you would fetch this data from your API
        setStats({
            totalApplications: 24,
            interviewsScheduled: 5,
            offersReceived: 2,
            rejections: 8,
            pendingResponses: 9,
            coldEmailsSent: 15
        });

        setRecentApplications([
            {
                id: 1,
                jobTitle: 'Frontend Developer',
                company: 'TechCorp',
                dateApplied: '2025-04-28',
                status: 'Applied'
            },
            {
                id: 2,
                jobTitle: 'React Engineer',
                company: 'InnovateSoft',
                dateApplied: '2025-04-27',
                status: 'Interview'
            },
            {
                id: 3,
                jobTitle: 'UI Developer',
                company: 'WebSolutions',
                dateApplied: '2025-04-26',
                status: 'Rejected'
            }
        ]);
    }, []);

    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                <p className="text-gray-600">Here's an overview of your job search progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon={<Briefcase size={24} className="text-blue-600" />}
                    change="12"
                    isPositive={true}
                />
                <StatCard
                    title="Interviews Scheduled"
                    value={stats.interviewsScheduled}
                    icon={<Clock size={24} className="text-purple-600" />}
                    change="25"
                    isPositive={true}
                />
                <StatCard
                    title="Offers Received"
                    value={stats.offersReceived}
                    icon={<CheckCircle size={24} className="text-green-600" />}
                    change="100"
                    isPositive={true}
                />
                <StatCard
                    title="Rejections"
                    value={stats.rejections}
                    icon={<XCircle size={24} className="text-red-600" />}
                    change="15"
                    isPositive={false}
                />
                <StatCard
                    title="Pending Responses"
                    value={stats.pendingResponses}
                    icon={<Clock size={24} className="text-orange-600" />}
                />
                <StatCard
                    title="Cold Emails Sent"
                    value={stats.coldEmailsSent}
                    icon={<Mail size={24} className="text-blue-600" />}
                    change="40"
                    isPositive={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                        <Link to="/applications" className="text-sm text-blue-600 hover:text-blue-800">
                            View all
                        </Link>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {recentApplications.map(app => (
                            <div key={app.id} className="py-3 flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-gray-900">{app.jobTitle}</h3>
                                    <p className="text-sm text-gray-600">{app.company}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{new Date(app.dateApplied).toLocaleDateString()}</span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                                            app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                                                app.status === 'Offer' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                    }`}>
                    {app.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link
                            to="/applications/add"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add New Application
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Application Status</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(stats.interviewsScheduled / stats.totalApplications) * 100}%` }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">Interview Rate ({Math.round((stats.interviewsScheduled / stats.totalApplications) * 100)}%)</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.offersReceived / stats.totalApplications) * 100}%` }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">Offer Rate ({Math.round((stats.offersReceived / stats.totalApplications) * 100)}%)</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(stats.rejections / stats.totalApplications) * 100}%` }}></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">Rejection Rate ({Math.round((stats.rejections / stats.totalApplications) * 100)}%)</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Applications by Status</h3>
                        <div className="flex">
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                                    <Briefcase size={20} className="text-blue-600" />
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">{stats.pendingResponses}</p>
                                <p className="text-xs text-gray-500">Pending</p>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full">
                                    <Clock size={20} className="text-purple-600" />
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">{stats.interviewsScheduled}</p>
                                <p className="text-xs text-gray-500">Interview</p>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full">
                                    <CheckCircle size={20} className="text-green-600" />
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">{stats.offersReceived}</p>
                                <p className="text-xs text-gray-500">Offer</p>
                            </div>
                            <div className="flex-1 text-center">
                                <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full">
                                    <XCircle size={20} className="text-red-600" />
                                </div>
                                <p className="mt-1 text-sm font-medium text-gray-900">{stats.rejections}</p>
                                <p className="text-xs text-gray-500">Rejected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;