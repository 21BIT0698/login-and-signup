import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function StudentCreateProfile() {
  const navigate = useNavigate();

  // ---------------- STATE ----------------
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [address, setAddress] = useState({
    country: "",
    state: "",
    district: "",
    line: "",
  });

  const [education, setEducation] = useState({
    tenth: { school: "", place: "", percentage: "" },
    twelfth: { school: "", place: "", percentage: "" },
    ug: { university: "", college: "", department: "", cgpa: "", graduationYear: "", place: "", activeBacklogs: "" },
  });

  const [errors, setErrors] = useState({});

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let tempErrors = {};
    // Personal
    if (!personal.name) tempErrors.name = "Name required";
    if (!personal.email) tempErrors.email = "Email required";
    if (!personal.phone) tempErrors.phone = "Phone required";
    if (!personal.gender) tempErrors.gender = "Gender required";
    if (!personal.dob) tempErrors.dob = "Date of Birth required";

    // Address
    if (!address.country) tempErrors.country = "Country required";
    if (!address.state) tempErrors.state = "State required";
    if (!address.district) tempErrors.district = "District required";
    if (!address.line) tempErrors.line = "Address line required";

    // 10th
    if (!education.tenth.school) tempErrors.tenthSchool = "10th School required";
    if (!education.tenth.place) tempErrors.tenthPlace = "10th Place required";
    if (!education.tenth.percentage) tempErrors.tenthPercentage = "10th % required";

    // 12th
    if (!education.twelfth.school) tempErrors.twelfthSchool = "12th School required";
    if (!education.twelfth.place) tempErrors.twelfthPlace = "12th Place required";
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage = "12th % required";

    // UG
    if (!education.ug.university) tempErrors.ugUniversity = "University required";
    if (!education.ug.college) tempErrors.ugCollege = "College required";
    if (!education.ug.department) tempErrors.ugDepartment = "Department required";
    if (!education.ug.cgpa) tempErrors.ugCgpa = "CGPA required";
    if (!education.ug.graduationYear) tempErrors.ugGraduationYear = "Graduation Year required";
    if (!education.ug.place) tempErrors.ugPlace = "Place required";
    if (!education.ug.activeBacklogs) tempErrors.ugActiveBacklogs = "Select backlogs";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { personal, address, education };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Profile created successfully", "success").then(() => navigate("/view-profile"));
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
    }
  };

  const inputStyle = (field) => ({
    padding: 8,
    borderRadius: 6,
    border: errors[field] ? "2px solid red" : "1px solid #ccc",
    outline: "none",
  });

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Profile</h2>
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* PERSONAL */}
          <h3>Personal Details</h3>
          <input style={inputStyle("name")} placeholder="Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} />
          <input style={inputStyle("email")} placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} />
          <input style={inputStyle("phone")} placeholder="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} />
          <input style={inputStyle("gender")} placeholder="Gender" value={personal.gender} onChange={(e) => setPersonal({ ...personal, gender: e.target.value })} />
          <input type="date" style={inputStyle("dob")} value={personal.dob} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} />

          {/* ADDRESS */}
          <h3>Address Details</h3>
          <input style={inputStyle("country")} placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          <input style={inputStyle("state")} placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
          <input style={inputStyle("district")} placeholder="District" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} />
          <input style={inputStyle("line")} placeholder="Address Line" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} />

          {/* 10th */}
          <h3>10th Details</h3>
          <input style={inputStyle("tenthSchool")} placeholder="School" value={education.tenth.school} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, school: e.target.value } })} />
          <input style={inputStyle("tenthPlace")} placeholder="Place" value={education.tenth.place} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, place: e.target.value } })} />
          <input style={inputStyle("tenthPercentage")} placeholder="Percentage" value={education.tenth.percentage} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, percentage: e.target.value } })} />

          {/* 12th */}
          <h3>12th Details</h3>
          <input style={inputStyle("twelfthSchool")} placeholder="School" value={education.twelfth.school} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, school: e.target.value } })} />
          <input style={inputStyle("twelfthPlace")} placeholder="Place" value={education.twelfth.place} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, place: e.target.value } })} />
          <input style={inputStyle("twelfthPercentage")} placeholder="Percentage" value={education.twelfth.percentage} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, percentage: e.target.value } })} />

          {/* UG */}
          <h3>UG Details</h3>
          <input style={inputStyle("ugUniversity")} placeholder="University" value={education.ug.university} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, university: e.target.value } })} />
          <input style={inputStyle("ugCollege")} placeholder="College" value={education.ug.college} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, college: e.target.value } })} />
          <input style={inputStyle("ugDepartment")} placeholder="Department" value={education.ug.department} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, department: e.target.value } })} />
          <input style={inputStyle("ugCgpa")} placeholder="CGPA" value={education.ug.cgpa} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, cgpa: e.target.value } })} />
          <input style={inputStyle("ugGraduationYear")} placeholder="Graduation Year" value={education.ug.graduationYear} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, graduationYear: e.target.value } })} />
          <input style={inputStyle("ugPlace")} placeholder="Place" value={education.ug.place} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, place: e.target.value } })} />
          <input style={inputStyle("ugActiveBacklogs")} placeholder="Active Backlogs (Yes/No)" value={education.ug.activeBacklogs} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, activeBacklogs: e.target.value } })} />

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f0f0f0" },
  formContainer: { background: "#fff", padding: 20, borderRadius: 12, width: 450, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", overflowY: "auto", maxHeight: "90vh" },
  heading: { textAlign: "center", fontSize: 28, marginBottom: 20, color: "#27ae60", borderBottom: "3px solid #27ae60", paddingBottom: 10 },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", outline: "none" },
  errorInput: { padding: 8, borderRadius: 6, border: "2px solid red", outline: "none" },
  button: { padding: 10, marginTop: 10, backgroundColor: "#27ae60", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }
};
