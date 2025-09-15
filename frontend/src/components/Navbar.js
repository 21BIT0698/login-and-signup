import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // loggedIn true if token exists
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  // Hide Navbar buttons on login/signup pages
  const hideButtons = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🌍 My Mern App</div>
      <div style={styles.links}>
        {!hideButtons && loggedIn && (
          <>
            {/* Dashboard button hidden */}
            <button style={{ ...styles.btn, background: "#c0392b" }} onClick={handleLogout}>Logout</button>
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
    padding: "12px 20px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "white",
  },
  logo: { fontWeight: "bold", fontSize: "22px" },
  links: { display: "flex", alignItems: "center", gap: "12px" },
  btn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "15px",
    transition: "0.3s",
  },
};
