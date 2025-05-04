import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import JobSearch from './pages/JobSearch/JobSearch';
import JobDetails from './pages/JobDetails/JobDetails';
import SavedJobs from './pages/SavedJobs/SavedJobs';
import ApplicationTracker from './pages/ApplicationTracker/ApplicationTracker';
import ColdEmailGenerator from './pages/ColdEmailGenerator/ColdEmailGenerator';
import ColdEmailTemplates from './pages/ColdEmailTemplates/ColdEmailTemplates';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/job-search" element={<JobSearch />} />
                        <Route path="/job/:id" element={<JobDetails />} />
                        <Route path="/saved-jobs" element={<SavedJobs />} />
                        <Route path="/application-tracker" element={<ApplicationTracker />} />
                        <Route path="/cold-email-generator" element={<ColdEmailGenerator />} />
                        <Route path="/cold-email-templates" element={<ColdEmailTemplates />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;