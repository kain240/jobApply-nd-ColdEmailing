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

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/job-listings" element={<JobListings />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cold-emailing" element={<ColdEmailing />} />
                <Route path="/" element={<ColdEmailForm />} />
                <Route path="/email-preview" element={<GeneratedEmail />} />
            </Routes>
        </Router>
    );
}

export default App;
