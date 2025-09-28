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
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>DOB</th>
              <th style={styles.th}>Country</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>District</th>
              <th style={styles.th}>Address Line</th>
              <th style={styles.th}>10th School</th>
              <th style={styles.th}>10th %</th>
              <th style={styles.th}>10th Place</th>
              <th style={styles.th}>12th School</th>
              <th style={styles.th}>12th %</th>
              <th style={styles.th}>12th Place</th>
              <th style={styles.th}>UG University</th>
              <th style={styles.th}>UG College</th>
              <th style={styles.th}>UG Department</th>
              <th style={styles.th}>UG CGPA</th>
              <th style={styles.th}>UG Graduation Year</th>
              <th style={styles.th}>UG Place</th>
              <th style={styles.th}>UG Active Backlogs</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={styles.td}>{student.personal?.name || "N/A"}</td>
                <td style={styles.td}>{student.personal?.email || "N/A"}</td>
                <td style={styles.td}>{student.personal?.phone || "N/A"}</td>
                <td style={styles.td}>{student.personal?.gender || "N/A"}</td>
                <td style={styles.td}>{student.personal?.dateOfBirth || "N/A"}</td>
                <td style={styles.td}>{student.address?.country === "Other" ? student.address?.otherCountry || "N/A" : student.address?.country || "N/A"}</td>
                <td style={styles.td}>{student.address?.state || "N/A"}</td>
                <td style={styles.td}>{student.address?.district || "N/A"}</td>
                <td style={styles.td}>{student.address?.line || "N/A"}</td>
                <td style={styles.td}>{student.education?.tenth?.school === "Other" ? student.education?.tenth?.otherSchool || "N/A" : student.education?.tenth?.school || "N/A"}</td>
                <td style={styles.td}>{student.education?.tenth?.percentage || "N/A"}</td>
                <td style={styles.td}>{student.education?.tenth?.place || "N/A"}</td>
                <td style={styles.td}>{student.education?.twelfth?.school === "Other" ? student.education?.twelfth?.otherSchool || "N/A" : student.education?.twelfth?.school || "N/A"}</td>
                <td style={styles.td}>{student.education?.twelfth?.percentage || "N/A"}</td>
                <td style={styles.td}>{student.education?.twelfth?.place || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.university === "Other" ? student.education?.ug?.otherUniversity || "N/A" : student.education?.ug?.university || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.college === "Other" ? student.education?.ug?.otherCollege || "N/A" : student.education?.ug?.college || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.department || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.cgpa || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.graduationYear || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.place || "N/A"}</td>
                <td style={styles.td}>{student.education?.ug?.activeBacklogs === 1 ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    color: "#27ae60", // green color
    textDecoration: "underline",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: 1400, // ensures no column squishes
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "2px solid #000", // 🔥 dark border
    minWidth: "120px",
  },
  td: {
    padding: "10px",
    border: "2px solid #000", // 🔥 dark border
    fontSize: "14px",
  },
};
