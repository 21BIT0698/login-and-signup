import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching profile");
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>
      <table style={styles.table}>
        <tbody>
          <tr><th>Name</th><td>{profile.personal.name}</td></tr>
          <tr><th>Email</th><td>{profile.personal.email}</td></tr>
          <tr><th>State</th><td>{profile.address.state}</td></tr>
          <tr><th>City</th><td>{profile.address.city}</td></tr>
          <tr><th>Country</th><td>{profile.address.country}</td></tr>
          <tr><th>Address Line</th><td>{profile.address.line}</td></tr>
          <tr><th>10th School</th><td>{profile.education.tenth.school}</td></tr>
          <tr><th>10th Place</th><td>{profile.education.tenth.place}</td></tr>
          <tr><th>10th %</th><td>{profile.education.tenth.percentage}</td></tr>
          <tr><th>12th School</th><td>{profile.education.twelfth.school}</td></tr>
          <tr><th>12th Place</th><td>{profile.education.twelfth.place}</td></tr>
          <tr><th>12th %</th><td>{profile.education.twelfth.percentage}</td></tr>
          <tr><th>UG University</th><td>{profile.education.ug.university}</td></tr>
          <tr><th>UG College</th><td>{profile.education.ug.college}</td></tr>
          <tr><th>UG Department</th><td>{profile.education.ug.department}</td></tr>
          <tr><th>UG CGPA</th><td>{profile.education.ug.cgpa}</td></tr>
          <tr><th>Graduation Year</th><td>{profile.education.ug.year}</td></tr>
          <tr><th>Graduation Place</th><td>{profile.education.ug.place}</td></tr>
          <tr><th>Graduation %</th><td>{profile.education.ug.percentage}</td></tr>
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
    width: "90%",
    maxWidth: 800,
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
