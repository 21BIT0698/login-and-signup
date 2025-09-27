import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h2>Dashboard</h2>
        {role==="student" && (
          <>
            <button style={styles.button} onClick={()=>navigate("/create-profile")}>Create Profile</button>
            <button style={styles.button} onClick={()=>navigate("/view-profile")}>View Profile</button>
          </>
        )}
        {role==="admin" && (
          <button style={styles.button} onClick={()=>navigate("/admin/students")}>View All Students</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { display:"flex", justifyContent:"center", alignItems:"center", height:"90vh", background:"linear-gradient(to right, #f7971e, #ffd200)" },
  box: { background:"#fff", padding:30, borderRadius:12, textAlign:"center", boxShadow:"0 4px 12px rgba(0,0,0,0.1)" },
  button: { padding:10, margin:10, backgroundColor:"#2980b9", color:"white", border:"none", borderRadius:8, cursor:"pointer" }
};
