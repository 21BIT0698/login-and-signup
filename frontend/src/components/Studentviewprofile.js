import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ViewProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Profile:", res.data);
        setProfile(res.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Cannot fetch profile",
        });
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      {/* Personal Info */}
      <h3 style={styles.section}>Personal Info</h3>
      <table style={styles.table}>
        <tbody>
          <tr><th style={styles.th}>Name</th><td style={styles.td}>{profile.personal?.name || "N/A"}</td></tr>
          <tr><th style={styles.th}>Email</th><td style={styles.td}>{profile.personal?.email || "N/A"}</td></tr>
          <tr><th style={styles.th}>Phone</th><td style={styles.td}>{profile.personal?.phone || "N/A"}</td></tr>
          <tr><th style={styles.th}>Gender</th><td style={styles.td}>{profile.personal?.gender || "N/A"}</td></tr>
          <tr><th style={styles.th}>Date of Birth</th><td style={styles.td}>{profile.personal?.dateOfBirth || "N/A"}</td></tr>
        </tbody>
      </table>

      {/* Address */}
      <h3 style={styles.section}>Address</h3>
      <table style={styles.table}>
        <tbody>
          <tr><th style={styles.th}>Country</th><td style={styles.td}>{profile.address?.country === "Other" ? profile.address?.otherCountry : profile.address?.country || "N/A"}</td></tr>
          <tr><th style={styles.th}>State</th><td style={styles.td}>{profile.address?.state || "N/A"}</td></tr>
          <tr><th style={styles.th}>District</th><td style={styles.td}>{profile.address?.district || "N/A"}</td></tr>
          <tr><th style={styles.th}>Address Line</th><td style={styles.td}>{profile.address?.line || "N/A"}</td></tr>
        </tbody>
      </table>

      {/* 10th Education */}
      <h3 style={styles.section}>10th Education</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <th style={styles.th}>School</th>
            <td style={styles.td}>{profile.education?.tenth?.school === "Other" ? profile.education?.tenth?.otherSchool || "N/A" : profile.education?.tenth?.school || "N/A"}</td>
          </tr>
          <tr><th style={styles.th}>Place</th><td style={styles.td}>{profile.education?.tenth?.place || "N/A"}</td></tr>
          <tr><th style={styles.th}>Percentage</th><td style={styles.td}>{profile.education?.tenth?.percentage || "N/A"}</td></tr>
        </tbody>
      </table>

      {/* 12th Education */}
      <h3 style={styles.section}>12th Education</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <th style={styles.th}>School</th>
            <td style={styles.td}>{profile.education?.twelfth?.school === "Other" ? profile.education?.twelfth?.otherSchool || "N/A" : profile.education?.twelfth?.school || "N/A"}</td>
          </tr>
          <tr><th style={styles.th}>Place</th><td style={styles.td}>{profile.education?.twelfth?.place || "N/A"}</td></tr>
          <tr><th style={styles.th}>Percentage</th><td style={styles.td}>{profile.education?.twelfth?.percentage || "N/A"}</td></tr>
        </tbody>
      </table>

      {/* UG Education */}
      <h3 style={styles.section}>UG Education</h3>
      <table style={styles.table}>
        <tbody>
          <tr>
            <th style={styles.th}>University</th>
            <td style={styles.td}>{profile.education?.ug?.university === "Other" ? profile.education?.ug?.otherUniversity || "N/A" : profile.education?.ug?.university || "N/A"}</td>
          </tr>
          <tr>
            <th style={styles.th}>College</th>
            <td style={styles.td}>{profile.education?.ug?.college === "Other" ? profile.education?.ug?.otherCollege || "N/A" : profile.education?.ug?.college || "N/A"}</td>
          </tr>
          <tr><th style={styles.th}>Department</th><td style={styles.td}>{profile.education?.ug?.department || "N/A"}</td></tr>
          <tr><th style={styles.th}>CGPA</th><td style={styles.td}>{profile.education?.ug?.cgpa || "N/A"}</td></tr>
          <tr><th style={styles.th}>Graduation Year</th><td style={styles.td}>{profile.education?.ug?.graduationYear || "N/A"}</td></tr>
          <tr><th style={styles.th}>Place</th><td style={styles.td}>{profile.education?.ug?.place || "N/A"}</td></tr>
          <tr><th style={styles.th}>Active Backlogs</th><td style={styles.td}>{profile.education?.ug?.activeBacklogs || "N/A"}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: 20, display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { marginBottom: 20, color: "#2c3e50", textDecoration: "underline" },
  section: { marginTop: 20, marginBottom: 10, color: "#34495e", textDecoration: "underline" },
  table: { borderCollapse: "collapse", width: "90%", maxWidth: 900, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
  th: { backgroundColor: "#2980b9", color: "#fff", padding: 10, textAlign: "left", width: "30%" },
  td: { padding: 10, borderBottom: "1px solid #ddd" },
};
