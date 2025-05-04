import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User, LogOut } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-30">
            <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-semibold text-blue-600">JobTracker</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2 rounded-full hover:bg-gray-100">
                        <Bell size={20} />
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>

                    <div className="relative">
                        <button
                            className="flex items-center gap-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={20} />
                                )}
                            </div>
                            <span className="hidden md:inline">{user.name}</span>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <User size={16} />
                                    Profile
                                </Link>
                                <Link to="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <Settings size={16} />
                                    Settings
                                </Link>
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
