// ------------------------ CREATE PROFILE WITH VALIDATION ------------------------ 
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
    dob: "",
  });

  const [address, setAddress] = useState({
    state: "",
    otherState: "",
    district: "",
    otherDistrict: "",
    country: "",
    otherCountry: "",
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
      otherDepartment: "",
      cgpa: "",
      graduationYear: "",
      place: "",
      activeBacklogs: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      personal: { ...personal, dateOfBirth: personal.dob },
      address: {
        ...address,
        country: address.country === "Other" ? address.otherCountry : address.country,
        state: address.state === "Other" ? address.otherState : address.state,
        district: address.district === "Other" ? address.otherDistrict : address.district
      },
      education: {
        tenth: { ...education.tenth, school: education.tenth.school === "Other" ? education.tenth.otherSchool : education.tenth.school },
        twelfth: { ...education.twelfth, school: education.twelfth.school === "Other" ? education.twelfth.otherSchool : education.twelfth.school },
        ug: {
          ...education.ug,
          university: education.ug.university === "Other" ? education.ug.otherUniversity : education.ug.university,
          college: education.ug.college === "Other" ? education.ug.otherCollege : education.ug.college,
          department: education.ug.department === "Other" ? education.ug.otherDepartment : education.ug.department,
          activeBacklogs: education.ug.activeBacklogs === "Yes" ? "Yes" : "No",
        },
      },
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({ icon: "success", title: "Profile Created", confirmButtonColor: "#2ecc71" })
        .then(() => navigate("/view-profile"));

    } catch (err) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: err.response?.data?.message || "Something went wrong", 
        confirmButtonColor: "#e74c3c" 
      });
    }
  };

  const validate = () => {
    let tempErrors = {};

    if (!personal.name) tempErrors.name = "Name is required";
    if (!personal.email) tempErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) tempErrors.email = "Invalid email";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    border: errors[field] ? "2px solid red" : "1px solid #ccc"
  });

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>

        <h2 style={styles.heading}>Create Profile</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <input
            style={getInputStyle("name")}
            type="text"
            placeholder="Enter Name"
            value={personal.name}
            onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
          />

          <input
            style={getInputStyle("email")}
            type="email"
            placeholder="Enter Email"
            value={personal.email}
            onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
          />

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    background: "linear-gradient(to right,#f7971e,#ffd200)" 
  },
  formContainer: { 
    background: "#fff", 
    padding: 20, 
    borderRadius: 12, 
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
    width: 400, 
    height: "90vh", 
    overflowY: "scroll" 
  },
  heading: { 
    textAlign: "center", 
    fontSize: "28px", 
    fontWeight: "900", 
    color: "#27ae60", 
    marginBottom: "25px", 
    borderBottom: "3px solid #27ae60", 
    paddingBottom: "10px" 
  },
  input: { 
    padding: 10, 
    borderRadius: 6, 
    border: "1px solid #ccc", 
    width: "100%" 
  },
  button: { 
    padding: 10, 
    marginTop: 20, 
    backgroundColor: "#27ae60", 
    color: "white", 
    border: "none", 
    borderRadius: 8, 
    cursor: "pointer" 
  }
};
