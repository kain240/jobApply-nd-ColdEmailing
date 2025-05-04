import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Ensure correct import
import Login from "./pages/Login"; // ✅ Ensure correct import
import Signup from "./pages/Signup"; // ✅ Ensure correct import
import Dashboard from "./pages/Dashboard"; // ✅ Ensure correct import
import ColdEmailing from "./pages/ColdEmailing"; // ✅ Ensure correct import
import JobListings from './pages/JobListings';
import ColdEmailForm from "./pages/ColdEmailing";
import GeneratedEmail from "./pages/GeneratedEmail";
import ResumeUpload from "./components/ResumeUpload";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<JobListings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/upload-resume" element={<ResumeUpload />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/generate-email" element={<ColdEmailing />} />
                <Route path="/email-output" element={<GeneratedEmail />} />
            </Routes>
        </Router>
    );
}

export default App;
