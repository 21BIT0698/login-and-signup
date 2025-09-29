// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Navigate to="/signup" replace />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Studentcreateprofile from "./components/Studentcreateprofile";
import Studentviewprofile from "./components/Studentviewprofile";
import Adminstudents from "./components/Adminstudent";
function App() {
  // Initial state direct ah localStorage la irundhu check pannu
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Login/Logout update capture panna
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />

        {/* Public Routes */}
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/create-profile" element={isLoggedIn && role === "student" ? <Studentcreateprofile /> : <Navigate to="/login" />} />
        <Route path="/view-profile" element={isLoggedIn && role === "student" ? <Studentviewprofile /> : <Navigate to="/login" />} />
        <Route path="/admin/students" element={isLoggedIn && role === "admin" ? <Adminstudents /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}



export default App;


