import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login API call
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      // ✅ Trigger Navbar update instantly
      window.dispatchEvent(new Event("storage"));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={{ color: "red", marginTop: "10px" }}>{msg}</p>
        
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#74ebd5" },
  formContainer: { background: "#fff", padding: 30, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 300, textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc", outline: "none" },
  button: { padding: 10, backgroundColor: "#2980b9", color: "white", fontWeight: "bold", border: "none", borderRadius: 8, cursor: "pointer" },
};  