import React, { useEffect, useState } from "react"; 
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  if (!students.length) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading students...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Students</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>State</th>
            <th>City</th>
            <th>10th School</th>
            <th>10th %</th>
            <th>12th School</th>
            <th>12th %</th>
            <th>UG College</th>
            <th>UG Department</th>
            <th>UG CGPA</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx}>
              <td>{student.personal?.name || "N/A"}</td>
              <td>{student.personal?.email || "N/A"}</td>
              <td>{student.address?.state || "N/A"}</td>
              <td>{student.address?.city || "N/A"}</td>
              <td>{student.education?.tenth?.school || "N/A"}</td>
              <td>{student.education?.tenth?.percentage || "N/A"}</td>
              <td>{student.education?.twelfth?.school || "N/A"}</td>
              <td>{student.education?.twelfth?.percentage || "N/A"}</td>
              <td>{student.education?.ug?.college || "N/A"}</td>
              <td>{student.education?.ug?.department || "N/A"}</td>
              <td>{student.education?.ug?.cgpa || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    marginBottom: 20,
    color: "#2c3e50",
    textDecoration: "underline",
  },
  table: {
    borderCollapse: "collapse",
    width: "95%",
    maxWidth: 1200,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
};
