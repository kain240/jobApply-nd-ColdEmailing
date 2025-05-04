import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    Mail,
    FileText,
    BarChart,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen fixed pt-16">
            <div className="overflow-y-auto py-4 px-3 h-full">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <LayoutDashboard className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applications"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Briefcase className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Job Applications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/cold-emails"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Mail className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Cold Emails</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/email-templates"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <FileText className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Email Templates</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/analytics"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <BarChart className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Analytics</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center p-2 text-base font-normal rounded-lg ${
                                    isActive
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-900 hover:bg-gray-100'
                                }`
                            }
                        >
                            <Settings className="flex-shrink-0 w-6 h-6 transition duration-75" />
                            <span className="ml-3">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
