import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const update = () => {
      setLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("login-update", update);
    return () => window.removeEventListener("login-update", update);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const hideButtons = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🌍 MERN App</div>

      <div style={styles.links}>
        {/* ✅ Show Login, Signup ONLY when not logged in */}
        {!loggedIn && !hideButtons && (
          <>
            <button style={styles.btn} onClick={() => navigate("/login")}>Login</button>
            <button style={styles.btn} onClick={() => navigate("/signup")}>Signup</button>
          </>
        )}

        {/* ✅ Show Logout ONLY when logged in */}
        {loggedIn && (
          <button style={styles.btn} onClick={handleLogout}>Logout</button>
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
    color: "white",
  },
  logo: { fontWeight: "bold", fontSize: 22 },
  links: { display: "flex", gap: 10 },
  btn: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    background: "orange",
    color: "white",
  },
};
