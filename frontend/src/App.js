import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Studentcreateprofile from "./components/Studentcreateprofile";
import Studentviewprofile from "./components/Studentviewprofile";
import Adminstudent from "./components/Adminstudent";

function App() {
  // ✅ FIX: Read login & role immediately on first render
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const updateLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("login-update", updateLogin);
    return () => window.removeEventListener("login-update", updateLogin);
  }, []);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

        <Route
          path="/create-profile"
          element={isLoggedIn && role === "student" ? <Studentcreateprofile /> : <Navigate to="/login" />}
        />

        <Route
          path="/view-profile"
          element={isLoggedIn && role === "student" ? <Studentviewprofile /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/students"
          element={isLoggedIn && role === "admin" ? <Adminstudent /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
