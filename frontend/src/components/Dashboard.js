import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div style={styles.page}>
      <div style={styles.buttonsContainer}>
        {role === "student" && (
          <>
            <button style={styles.button} onClick={()=>navigate("/create-profile")}>Create Profile</button>
            <button style={styles.button} onClick={()=>navigate("/view-profile")}>View Profile</button>
          </>
        )}
        {role === "admin" && (
          <button style={styles.button} onClick={()=>navigate("/admin/students")}>View All Students</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(to right, #f7971e, #ffd200)"
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "300px"
  },
  button: {
    padding: 25,
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 20,
    cursor: "pointer",
    fontWeight: "bold"
  }
};
