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
    hscSchool: "",
    hscBoard: "",
    hscMarks: "",
    hscYop: "",

    university: "",
    college: "",
    department: "",
    ugCgpa: "",
    ugYop: "",
  });

  const [errors, setErrors] = useState({});

  const boards = ["State Board", "CBSE", "ICSE", "Matric", "Other"];
  const universities = [
    "Anna University",
    "VIT",
    "SRM",
    "IIT",
    "Thiruvalluvar",
    "SASTRA",
    "Sathyabama",
    "PSG",
    "Other",
  ];
  const departments = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "Mechanical",
    "Civil",
    "AI & DS",
    "MBA",
    "Other",
  ];

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let err = {};

    // Personal
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

    // HSC Validation
    if (!education.hscSchool.trim()) err.hscSchool = "Enter school name";
    if (!education.hscBoard) err.hscBoard = "Select board";
    if (!education.hscMarks) err.hscMarks = "Enter percentage/marks";
    if (!education.hscYop) err.hscYop = "Enter passing year";

    // UG Validation
    if (!education.university) err.university = "Select university";
    if (!education.college.trim()) err.college = "Enter college";
    if (!education.department) err.department = "Select department";

    if (!education.ugYop) err.ugYop = "Enter UG passing year";

    if (!education.ugCgpa) {
      err.ugCgpa = "Enter CGPA";
    } else if (education.ugCgpa <= 0 || education.ugCgpa > 10) {
      err.ugCgpa = "CGPA must be between 1–10";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post("/api/profile", { personal, education });
      Swal.fire("Success", "Profile Saved Successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div style={{ width: "100%", padding: 20, maxHeight: "90vh", overflowY: "scroll" }}>
      <h2
        style={{
          textAlign: "center",
          textDecoration: "underline",
          color: "#27ae60",
          marginBottom: 20,
          width: "100%",
        }}
      >
        Create Profile
      </h2>

      {/* PERSONAL */}
      <h3 style={{ color: "#2980b9" }}>Personal Details</h3>

      <input type="text" placeholder="Full Name"
        value={personal.name}
        onChange={(e) => setPersonal({ ...personal, name: e.target.value })}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input type="email" placeholder="Email"
        value={personal.email}
        onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input type="text" placeholder="Phone Number"
        value={personal.phone}
        onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

      <select value={personal.gender}
        onChange={(e) => setPersonal({ ...personal, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}

      <input type="date"
        value={personal.dob}
        onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
      />
      {errors.dob && <p style={{ color: "red" }}>{errors.dob}</p>}

      {/* 12TH DETAILS */}
      <h3 style={{ color: "#2980b9", marginTop: 20 }}>12th / HSC Details</h3>

      <input type="text" placeholder="School Name"
        value={education.hscSchool}
        onChange={(e) => setEducation({ ...education, hscSchool: e.target.value })}
      />
      {errors.hscSchool && <p style={{ color: "red" }}>{errors.hscSchool}</p>}

      <select value={education.hscBoard}
        onChange={(e) => setEducation({ ...education, hscBoard: e.target.value })}
      >
        <option value="">Select Board</option>
        {boards.map((b) => <option key={b}>{b}</option>)}
      </select>
      {errors.hscBoard && <p style={{ color: "red" }}>{errors.hscBoard}</p>}

      <input type="number" placeholder="Percentage / Marks"
        value={education.hscMarks}
        onChange={(e) => setEducation({ ...education, hscMarks: e.target.value })}
      />
      {errors.hscMarks && <p style={{ color: "red" }}>{errors.hscMarks}</p>}

      <input type="number" placeholder="Year of Passing"
        value={education.hscYop}
        onChange={(e) => setEducation({ ...education, hscYop: e.target.value })}
      />
      {errors.hscYop && <p style={{ color: "red" }}>{errors.hscYop}</p>}

      {/* UG DETAILS */}
      <h3 style={{ color: "#2980b9", marginTop: 20 }}>UG Details</h3>

      <select value={education.university}
        onChange={(e) => setEducation({ ...education, university: e.target.value })}
      >
        <option value="">Select University</option>
        {universities.map((u) => <option key={u}>{u}</option>)}
      </select>
      {errors.university && <p style={{ color: "red" }}>{errors.university}</p>}

      <input type="text" placeholder="College Name"
        value={education.college}
        onChange={(e) => setEducation({ ...education, college: e.target.value })}
      />
      {errors.college && <p style={{ color: "red" }}>{errors.college}</p>}

      <select value={education.department}
        onChange={(e) => setEducation({ ...education, department: e.target.value })}
      >
        <option value="">Select Department</option>
        {departments.map((d) => <option key={d}>{d}</option>)}
      </select>
      {errors.department && <p style={{ color: "red" }}>{errors.department}</p>}

      <input type="number" placeholder="CGPA (0 - 10)"
        value={education.ugCgpa}
        onChange={(e) => setEducation({ ...education, ugCgpa: e.target.value })}
      />
      {errors.ugCgpa && <p style={{ color: "red" }}>{errors.ugCgpa}</p>}

      <input type="number" placeholder="Year of Passing"
        value={education.ugYop}
        onChange={(e) => setEducation({ ...education, ugYop: e.target.value })}
      />
      {errors.ugYop && <p style={{ color: "red" }}>{errors.ugYop}</p>}

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: "10px",
          background: "#27ae60",
          color: "white",
          width: "100%",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save Profile
      </button>
    </div>
  );
}
