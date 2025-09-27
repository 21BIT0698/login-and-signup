import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));

      // If token removed from another tab, redirect to login
      if (!localStorage.getItem("token")) {
        navigate("/login", { replace: true });
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const handleLogout = () => {
    // Remove token & role
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Update state
    setLoggedIn(false);
    setRole(null);

    // Navigate to login after tiny delay
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 50);
  };

  // Hide buttons on login/signup page
  const hideButtons = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🌍 MERN App</div>
      <div style={styles.links}>
        {!hideButtons && loggedIn && role === "student" && (
          <button style={styles.btn} onClick={handleLogout}>Logout</button>
        )}
        {!hideButtons && loggedIn && role === "admin" && (
          <>
            <button style={styles.btn} onClick={() => navigate("/admin/students")}>View All Students</button>
            <button style={styles.btn} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    background: "linear-gradient(to right,#6a11cb,#2575fc)",
    color: "white"
  },
  logo: { fontWeight: "bold", fontSize: 22 },
  links: { display: "flex", gap: 10 },
  btn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    background: "#2980b9",
    color: "white"
  }
};
