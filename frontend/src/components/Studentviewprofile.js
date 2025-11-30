import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", gender: "", dob: "" });
  const [address, setAddress] = useState({ state: "", otherState: "", district: "", otherDistrict: "", country: "", otherCountry: "", line: "" });
  const [education, setEducation] = useState({
    tenth: { school: "", otherSchool: "", place: "", percentage: "" },
    twelfth: { school: "", otherSchool: "", place: "", percentage: "" },
    ug: { university: "", otherUniversity: "", college: "", otherCollege: "", department: "", otherDepartment: "", cgpa: "", graduationYear: "", place: "", activeBacklogs: "" }
  });
  const [errors, setErrors] = useState({});

  const countries = ["India","USA","UK","Canada","Australia","Germany","France","Italy","Japan","China","Brazil","Mexico","South Africa","Russia","Spain","Sweden","Norway","Switzerland","Netherlands","New Zealand","Other"];
  const states = ["Tamil Nadu","Kerala","Karnataka","Odisha","Gujarat","Haryana","Delhi","Manipur","Maharashtra","Other"];
  const districts = ["Chennai","Coimbatore","Madurai","Vellore","Tiruvannamalai","Kanchipuram","Tirunelveli","Chengalpattu","Karur","Sivagangai","Salem","Erode","Other"];
  const schools = ["Government High School","Government Higher Secondary School","Kendriya Vidyalaya (KV)","Jawahar Navodaya Vidyalaya","DAV School","Other"];
  const universities = ["Anna University","VIT","Annamalai","Karunya","Loyolo","Presidency","PSG","SRM","CIT","Vel Tech","IIT","Bharathidasan","Sathyabama","SASTRA","Thiruvalluvar","Other"];
  const colleges = ["VIT","Loyolo","Sathyabama","Coimbatore","Bharathidasan","IIT","Chennai","Vel Tech","SRM","Karunya","Presidency","PSG","Other"];
  const departments = ["CSE","IT","ECE","EEE","Mechanical","Civil","IOT","AI&ML","Hotel Management","AI","Other"];

  const getInputStyle = (field) => ({
    border: errors[field] ? "2px solid red" : "1px solid #ccc",
    padding: 8,
    borderRadius: 5,
    width: "100%",
    marginBottom: 8
  });

  const validate = () => {
    let tempErrors = {};

    // Personal
    if (!personal.name) tempErrors.name = "Name required";
    if (!personal.email) tempErrors.email = "Email required";
    if (!personal.phone) tempErrors.phone = "Phone required";
    if (!personal.gender) tempErrors.gender = "Gender required";
    if (!personal.dob) tempErrors.dob = "DOB required";

    // Address
    if (!address.country) tempErrors.country = "Country required";
    if (address.country === "Other" && !address.otherCountry) tempErrors.otherCountry = "Enter Country";
    if (!address.state) tempErrors.state = "State required";
    if (address.state === "Other" && !address.otherState) tempErrors.otherState = "Enter State";
    if (!address.district) tempErrors.district = "District required";
    if (address.district === "Other" && !address.otherDistrict) tempErrors.otherDistrict = "Enter District";
    if (!address.line) tempErrors.line = "Address line required";

    // 10th
    if (!education.tenth.school) tempErrors.tenthSchool = "10th School required";
    if (education.tenth.school === "Other" && !education.tenth.otherSchool) tempErrors.tenthOtherSchool = "Enter School";
    if (!education.tenth.place) tempErrors.tenthPlace = "10th Place required";
    if (!education.tenth.percentage) tempErrors.tenthPercentage = "10th Percentage required";

    // 12th
    if (!education.twelfth.school) tempErrors.twelfthSchool = "12th School required";
    if (education.twelfth.school === "Other" && !education.twelfth.otherSchool) tempErrors.twelfthOtherSchool = "Enter School";
    if (!education.twelfth.place) tempErrors.twelfthPlace = "12th Place required";
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage = "12th Percentage required";

    // UG
    if (!education.ug.university) tempErrors.ugUniversity = "University required";
    if (education.ug.university === "Other" && !education.ug.otherUniversity) tempErrors.ugOtherUniversity = "Enter University";
    if (!education.ug.college) tempErrors.ugCollege = "College required";
    if (education.ug.college === "Other" && !education.ug.otherCollege) tempErrors.ugOtherCollege = "Enter College";
    if (!education.ug.department) tempErrors.ugDepartment = "Department required";
    if (education.ug.department === "Other" && !education.ug.otherDepartment) tempErrors.ugOtherDepartment = "Enter Department";
    if (!education.ug.cgpa) tempErrors.ugCgpa = "CGPA required";
    if (!education.ug.graduationYear) tempErrors.ugGraduationYear = "Graduation Year required";
    if (!education.ug.place) tempErrors.ugPlace = "UG Place required";
    if (!education.ug.activeBacklogs) tempErrors.ugActiveBacklogs = "Select Active Backlogs";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

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
          department: education.ug.department === "Other" ? education.ug.otherDepartment : education.ug.department
        }
      }
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload, { headers: { Authorization: `Bearer ${token}` } });
      Swal.fire({ icon: "success", title: "Profile Created" }).then(() => navigate("/view-profile"));
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(to right, yellow, orange)" }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 12, width: 500, maxHeight: "95vh", overflowY: "auto", boxShadow: "0px 0px 12px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 15, color: "green", fontWeight: "bold", borderBottom: "3px solid green", paddingBottom: 8 }}>Create Profile</h2>

        <form onSubmit={handleSubmit}>

           <h2 style={{ textAlign: "center", marginBottom: 15, color: "green", fontWeight: "bold", borderBottom: "3px solid green", paddingBottom: 8 }}>Personal etails</h2>
          <input placeholder="Name" style={getInputStyle("name")} value={personal.name} onChange={e => setPersonal({ ...personal, name: e.target.value })} required />
          <input placeholder="Email" style={getInputStyle("email")} value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} required />
          <input placeholder="Phone" style={getInputStyle("phone")} value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} required />
          <input placeholder="Gender" style={getInputStyle("gender")} value={personal.gender} onChange={e => setPersonal({ ...personal, gender: e.target.value })} required />
          <input type="date" style={getInputStyle("dob")} value={personal.dob} onChange={e => setPersonal({ ...personal, dob: e.target.value })} required />

          {/* Address Details */}
          <h4 style={{ color: "green" }}>Address Details</h4>
          <select style={getInputStyle("country")} value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} required>
            <option value="">Select Country</option>{countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {address.country === "Other" && <input placeholder="Enter Country" style={getInputStyle("otherCountry")} value={address.otherCountry} onChange={e => setAddress({ ...address, otherCountry: e.target.value })} required />}

          <select style={getInputStyle("state")} value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required>
            <option value="">Select State</option>{states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {address.state === "Other" && <input placeholder="Enter State" style={getInputStyle("otherState")} value={address.otherState} onChange={e => setAddress({ ...address, otherState: e.target.value })} required />}

          <select style={getInputStyle("district")} value={address.district} onChange={e => setAddress({ ...address, district: e.target.value })} required>
            <option value="">Select District</option>{districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {address.district === "Other" && <input placeholder="Enter District" style={getInputStyle("otherDistrict")} value={address.otherDistrict} onChange={e => setAddress({ ...address, otherDistrict: e.target.value })} required />}

          <input placeholder="Address Line" style={getInputStyle("line")} value={address.line} onChange={e => setAddress({ ...address, line: e.target.value })} required />

          {/* 10th Details */}
          <h4 style={{ color: "green" }}>10th Details</h4>
          <select style={getInputStyle("tenthSchool")} value={education.tenth.school} onChange={e => setEducation({ ...education, tenth: { ...education.tenth, school: e.target.value } })} required>
            <option value="">Select School</option>{schools.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {education.tenth.school === "Other" && <input placeholder="Enter School" style={getInputStyle("tenthOtherSchool")} value={education.tenth.otherSchool} onChange={e => setEducation({ ...education, tenth: { ...education.tenth, otherSchool: e.target.value } })} required />}
          <input placeholder="Place" style={getInputStyle("tenthPlace")} value={education.tenth.place} onChange={e => setEducation({ ...education, tenth: { ...education.tenth, place: e.target.value } })} required />
          <input placeholder="Percentage" style={getInputStyle("tenthPercentage")} value={education.tenth.percentage} onChange={e => setEducation({ ...education, tenth: { ...education.tenth, percentage: e.target.value } })} required />

          {/* 12th Details */}
          <h4 style={{ color: "green" }}>12th Details</h4>
          <select style={getInputStyle("twelfthSchool")} value={education.twelfth.school} onChange={e => setEducation({ ...education, twelfth: { ...education.twelfth, school: e.target.value } })} required>
            <option value="">Select School</option>{schools.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {education.twelfth.school === "Other" && <input placeholder="Enter School" style={getInputStyle("twelfthOtherSchool")} value={education.twelfth.otherSchool} onChange={e => setEducation({ ...education, twelfth: { ...education.twelfth, otherSchool: e.target.value } })} required />}
          <input placeholder="Place" style={getInputStyle("twelfthPlace")} value={education.twelfth.place} onChange={e => setEducation({ ...education, twelfth: { ...education.twelfth, place: e.target.value } })} required />
          <input placeholder="Percentage" style={getInputStyle("twelfthPercentage")} value={education.twelfth.percentage} onChange={e => setEducation({ ...education, twelfth: { ...education.twelfth, percentage: e.target.value } })} required />

          {/* UG Details */}
          <h4 style={{ color: "green" }}>UG Details</h4>
          <select style={getInputStyle("ugUniversity")} value={education.ug.university} onChange={e => setEducation({ ...education, ug: { ...education.ug, university: e.target.value } })} required>
            <option value="">Select University</option>{universities.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          {education.ug.university === "Other" && <input placeholder="Enter University" style={getInputStyle("ugOtherUniversity")} value={education.ug.otherUniversity} onChange={e => setEducation({ ...education, ug: { ...education.ug, otherUniversity: e.target.value } })} required />}

          <select style={getInputStyle("ugCollege")} value={education.ug.college} onChange={e => setEducation({ ...education, ug: { ...education.ug, college: e.target.value } })} required>
            <option value="">Select College</option>{colleges.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {education.ug.college === "Other" && <input placeholder="Enter College" style={getInputStyle("ugOtherCollege")} value={education.ug.otherCollege} onChange={e => setEducation({ ...education, ug: { ...education.ug, otherCollege: e.target.value } })} required />}

          <select style={getInputStyle("ugDepartment")} value={education.ug.department} onChange={e => setEducation({ ...education, ug: { ...education.ug, department: e.target.value } })} required>
            <option value="">Select Department</option>{departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {education.ug.department === "Other" && <input placeholder="Enter Department" style={getInputStyle("ugOtherDepartment")} value={education.ug.otherDepartment} onChange={e => setEducation({ ...education, ug: { ...education.ug, otherDepartment: e.target.value } })} required />}

          <input placeholder="CGPA" style={getInputStyle("ugCgpa")} value={education.ug.cgpa} onChange={e => setEducation({ ...education, ug: { ...education.ug, cgpa: e.target.value } })} required />
          <input placeholder="Graduation Year" style={getInputStyle("ugGraduationYear")} value={education.ug.graduationYear} onChange={e => setEducation({ ...education, ug: { ...education.ug, graduationYear: e.target.value } })} required />
          <input placeholder="Place" style={getInputStyle("ugPlace")} value={education.ug.place} onChange={e => setEducation({ ...education, ug: { ...education.ug, place: e.target.value } })} required />
          <select style={getInputStyle("ugActiveBacklogs")} value={education.ug.activeBacklogs} onChange={e => setEducation({ ...education, ug: { ...education.ug, activeBacklogs: e.target.value } })} required>
            <option value="">Active Backlogs?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button type="submit" style={{ padding: 10, background: "green", color: "#fff", border: "none", borderRadius: 6, width: "100%", marginTop: 10, fontWeight: "bold", cursor: "pointer" }}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}
