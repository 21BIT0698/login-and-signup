import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      if(res.data.role !== "admin"){
        Swal.fire({ icon: "error", title: "Access Denied", text: "This is admin login only." });
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/admin-dashboard");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Login Failed", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f0f0" },
  container: { display: "flex", flexDirection: "column", alignItems: "center", gap: 20, background: "#fff", padding: 40, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: 12, width: "100%" },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc", outline: "none", width: "100%" },
  button: { padding: 10, borderRadius: 8, border: "none", cursor: "pointer", backgroundColor: "#2980b9", color: "#fff", fontWeight: "bold" },
};
