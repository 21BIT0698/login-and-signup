import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CreateProfile() {
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [education, setEducation] = useState({
    university: "",
    college: "",
    department: "",
    yop: "",
    cgpa: "",
  });

  const [errors, setErrors] = useState({});

  const universities = [
    "Anna University",
    "VIT",
    "Annamalai",
    "Karunya",
    "Loyolo",
    "Presidency",
    "PSG",
    "SRM",
    "CIT",
    "Vel Tech",
    "IIT",
    "Bharathidasan",
    "Sathyabama",
    "SASTRA",
    "Thiruvalluvar",
    "Other",
  ];

  const colleges = [
    "VIT",
    "Loyolo",
    "Sathyabama",
    "Coimbatore",
    "Bharathidasan",
    "IIT",
    "Chennai",
    "Vel Tech",
    "SRM",
    "Karunya",
    "Presidency",
    "PSG",
    "Other",
  ];

  const departments = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "AI & DS",
    "Mechanical",
    "Civil",
    "MBA",
    "BCom",
    "BBA",
    "Other",
  ];

  // ---------------- VALIDATION ----------------

  const validate = () => {
    let err = {};

    if (!personal.name.trim()) err.name = "Name required";

    if (!personal.email.trim()) {
      err.email = "Email required";
    } else {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(personal.email)) err.email = "Invalid Email";
    }

    if (!personal.phone.trim()) {
      err.phone = "Phone required";
    } else if (!/^[0-9]{10}$/.test(personal.phone)) {
      err.phone = "Phone must be 10 digits";
    }

    if (!personal.gender) err.gender = "Gender required";
    if (!personal.dob) err.dob = "DOB required";

    if (!education.university) err.university = "Select university";
    if (!education.college) err.college = "Select college";
    if (!education.department) err.department = "Select department";
    if (!education.yop) err.yop = "Enter year of passing";

    if (!education.cgpa) {
      err.cgpa = "CGPA / % required";
    } else if (education.cgpa <= 0 || education.cgpa > 100) {
      err.cgpa = "Enter valid score";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post("/api/profile", { personal, education });
      Swal.fire("Success", "Profile Created Successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        padding: 20,
        maxHeight: "90vh",
        overflowY: "scroll",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          textDecoration: "underline",
          color: "#27ae60",
          marginBottom: 20,
          width: "100%",
          display: "block",
        }}
      >
        Create Profile
      </h2>

      {/* PERSONAL DETAILS */}
      <h3 style={{ color: "#2980b9", marginBottom: 10 }}>Personal Details</h3>

      <input
        type="text"
        placeholder="Enter Name"
        value={personal.name}
        onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="email"
        placeholder="Enter Email"
        value={personal.email}
        onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={personal.phone}
        onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

      <select
        value={personal.gender}
        onChange={(e) => setPersonal({ ...personal, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

      <input
        type="date"
        value={personal.dob}
        onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
      />
      {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}

      {/* EDUCATION */}
      <h3 style={{ color: "#2980b9", marginTop: 20 }}>Education Details</h3>

      <select
        value={education.university}
        onChange={(e) =>
          setEducation({ ...education, university: e.target.value })
        }
      >
        <option value="">Select University</option>
        {universities.map((u) => (
          <option key={u}>{u}</option>
        ))}
      </select>
      {errors.university && <p style={{ color: "red" }}>{errors.university}</p>}

      <select
        value={education.college}
        onChange={(e) => setEducation({ ...education, college: e.target.value })}
      >
        <option value="">Select College</option>
        {colleges.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {errors.college && <p style={{ color: "red" }}>{errors.college}</p>}

      <select
        value={education.department}
        onChange={(e) =>
          setEducation({ ...education, department: e.target.value })
        }
      >
        <option value="">Select Department</option>
        {departments.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
      {errors.department && (
        <p style={{ color: "red" }}>{errors.department}</p>
      )}

      <input
        type="number"
        placeholder="Year of Passing"
        value={education.yop}
        onChange={(e) => setEducation({ ...education, yop: e.target.value })}
      />
      {errors.yop && <p style={{ color: "red" }}>{errors.yop}</p>}

      <input
        type="number"
        placeholder="Enter CGPA / Percentage"
        value={education.cgpa}
        onChange={(e) => setEducation({ ...education, cgpa: e.target.value })}
      />
      {errors.cgpa && <p style={{ color: "red" }}>{errors.cgpa}</p>}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "#27ae60",
          color: "white",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Save Profile
      </button>
    </div>
  );
}
