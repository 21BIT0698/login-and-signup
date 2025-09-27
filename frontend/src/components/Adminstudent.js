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
              <td>{student.personal.name}</td>
              <td>{student.personal.email}</td>
              <td>{student.address.state}</td>
              <td>{student.address.city}</td>
              <td>{student.education.tenth.school}</td>
              <td>{student.education.tenth.percentage}</td>
              <td>{student.education.twelfth.school}</td>
              <td>{student.education.twelfth.percentage}</td>
              <td>{student.education.ug.college}</td>
              <td>{student.education.ug.department}</td>
              <td>{student.education.ug.cgpa}</td>
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
  th: {
    backgroundColor: "#2980b9",
    color: "#fff",
    padding: 10,
    textAlign: "left",
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
};
