import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeUploader from './components/ResumeUploader';
import JobListings from './components/JobListings';
import EmailDraft from './components/EmailDraft';
import FollowUpManager from './components/FollowUpManager';
import AuthForm from './components/AuthForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/resume-uploader" element={<ResumeUploader />} />
        <Route path="/job-listings" element={<JobListings />} />
        <Route path="/email-draft" element={<EmailDraft />} />
        <Route path="/follow-up-manager" element={<FollowUpManager />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
};

export default App;