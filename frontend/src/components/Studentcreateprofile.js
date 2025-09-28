import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
  });

  const [address, setAddress] = useState({
    country: "",
    otherCountry: "",
    state: "",
    district: "",
    line: "",
  });

  const [education, setEducation] = useState({
    tenth: { school: "", otherSchool: "", place: "", percentage: "" },
    twelfth: { school: "", otherSchool: "", place: "", percentage: "" },
    ug: {
      university: "",
      otherUniversity: "",
      college: "",
      otherCollege: "",
      department: "",
      cgpa: "",
      graduationYear: "",
      place: "",
      activeBacklogs: "",
    },
  });

  const countries = ["India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Other"];
  const states = ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra"];
  const districts = ["Chennai", "Coimbatore", "Madurai", "Vellore", "Tirunelveli", "Salem", "Erode"];
  const schools = ["Govt HSS, Saidapet", "KV IIT Chennai", "DAV School", "Other"];
  const universities = ["Anna University", "VIT Vellore", "Other"];
  const colleges = ["Loyola College", "PSG College", "Other"];
  const departments = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      personal: {
        ...personal
      },
      address: {
        ...address,
        country: address.country === "Other" ? address.otherCountry : address.country,
      },
      education: {
        tenth: {
          ...education.tenth,
          school: education.tenth.school === "Other" ? education.tenth.otherSchool : education.tenth.school,
        },
        twelfth: {
          ...education.twelfth,
          school: education.twelfth.school === "Other" ? education.twelfth.otherSchool : education.twelfth.school,
        },
        ug: {
          ...education.ug,
          university: education.ug.university === "Other" ? education.ug.otherUniversity : education.ug.university,
          college: education.ug.college === "Other" ? education.ug.otherCollege : education.ug.college,
        },
      },
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({ icon: "success", title: "Profile Created", confirmButtonColor: "#2ecc71" }).then(() => navigate("/view-profile"));
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || "Something went wrong", confirmButtonColor: "#e74c3c" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h4>Personal Info</h4>
          <input placeholder="Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} style={styles.input} />
          <input placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} style={styles.input} />
          <input placeholder="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} style={styles.input} />
          <select value={personal.gender} onChange={(e) => setPersonal({ ...personal, gender: e.target.value })} style={styles.input}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" value={personal.dateOfBirth} onChange={(e) => setPersonal({ ...personal, dateOfBirth: e.target.value })} style={styles.input} />

          <h4>Address</h4>
          <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} style={styles.input}>
            <option value="">Select Country</option>
            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {address.country === "Other" && <input placeholder="Enter Country" value={address.otherCountry} onChange={(e) => setAddress({ ...address, otherCountry: e.target.value })} style={styles.input} />}
          <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={styles.input}>
            <option value="">Select State</option>
            {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          <select value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} style={styles.input}>
            <option value="">Select District</option>
            {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <textarea placeholder="Address Line" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} style={{ ...styles.input, height: 60 }} />

          <h4>Education</h4>
          <h5>10th</h5>
          <select value={education.tenth.school} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, school: e.target.value } })} style={styles.input}>
            <option value="">Select School</option>
            {schools.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {education.tenth.school === "Other" && <input placeholder="Enter School Name" value={education.tenth.otherSchool} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, otherSchool: e.target.value } })} style={styles.input} />}
          <input placeholder="Place" value={education.tenth.place} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, place: e.target.value } })} style={styles.input} />
          <input placeholder="Percentage" value={education.tenth.percentage} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, percentage: e.target.value } })} style={styles.input} />

          <h5>UG</h5>
          <select value={education.ug.college} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, college: e.target.value } })} style={styles.input}>
            <option value="">Select College</option>
            {colleges.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {education.ug.college === "Other" && <input placeholder="Enter College Name" value={education.ug.otherCollege} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherCollege: e.target.value } })} style={styles.input} />}
          <input placeholder="Active Backlogs" value={education.ug.activeBacklogs} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, activeBacklogs: e.target.value } })} style={styles.input} />

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f1f1f1" },
  formContainer: { background: "#fff", padding: 20, borderRadius: 12, width: 400, maxHeight: "90vh", overflowY: "auto" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc" },
  button: { padding: 10, backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: 6, cursor: "pointer" },
};
