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
    if (!personal.name) tempErrors.name = "Name is required";
    if (!personal.email) tempErrors.email = "Email is required";
    if (!personal.phone) tempErrors.phone = "Phone is required";
    if (!personal.gender) tempErrors.gender = "Gender is required";
    if (!personal.dob) tempErrors.dob = "DOB is required";

    // Address
    if (!address.country) tempErrors.country = "Country required";
    if (address.country === "Other" && !address.otherCountry) tempErrors.otherCountry = "Enter country";
    if (!address.state) tempErrors.state = "State required";
    if (address.state === "Other" && !address.otherState) tempErrors.otherState = "Enter state";
    if (!address.district) tempErrors.district = "District required";
    if (address.district === "Other" && !address.otherDistrict) tempErrors.otherDistrict = "Enter district";
    if (!address.line) tempErrors.line = "Address line required";

    // 10th
    if (!education.tenth.school) tempErrors.tenthSchool = "10th school required";
    if (education.tenth.school === "Other" && !education.tenth.otherSchool) tempErrors.tenthOtherSchool = "Enter school";
    if (!education.tenth.place) tempErrors.tenthPlace = "10th place required";
    if (!education.tenth.percentage) tempErrors.tenthPercentage = "10th percentage required";

    // 12th
    if (!education.twelfth.school) tempErrors.twelfthSchool = "12th school required";
    if (education.twelfth.school === "Other" && !education.twelfth.otherSchool) tempErrors.twelfthOtherSchool = "Enter school";
    if (!education.twelfth.place) tempErrors.twelfthPlace = "12th place required";
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage = "12th percentage required";

    // UG
    if (!education.ug.university) tempErrors.ugUniversity = "University required";
    if (education.ug.university === "Other" && !education.ug.otherUniversity) tempErrors.ugOtherUniversity = "Enter university";
    if (!education.ug.college) tempErrors.ugCollege = "College required";
    if (education.ug.college === "Other" && !education.ug.otherCollege) tempErrors.ugOtherCollege = "Enter college";
    if (!education.ug.department) tempErrors.ugDepartment = "Department required";
    if (education.ug.department === "Other" && !education.ug.otherDepartment) tempErrors.ugOtherDepartment = "Enter department";

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

  const renderSelectWithOther = (value, otherValue, options, label, mainKey, otherKey, setStateFunc) => (
    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
      <select
        style={getInputStyle(mainKey)}
        value={value}
        onChange={e => setStateFunc(prev => ({ ...prev, [mainKey]: e.target.value }))}
      >
        <option value="">{label}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {value === "Other" && (
        <input
          placeholder={`Enter ${label}`}
          style={getInputStyle(otherKey)}
          value={otherValue}
          onChange={e => setStateFunc(prev => ({ ...prev, [otherKey]: e.target.value }))}
        />
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(to right, yellow, orange)" }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 12, width: 500, maxHeight: "95vh", overflowY: "auto", boxShadow: "0px 0px 12px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 15, color: "green", fontWeight: "bold", borderBottom: "3px solid green", paddingBottom: "8px" }}>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <h4>Personal Details</h4>
          <input placeholder="Name" style={getInputStyle("name")} value={personal.name} onChange={e => setPersonal({ ...personal, name: e.target.value })} />
          <input placeholder="Email" style={getInputStyle("email")} value={personal.email} onChange={e => setPersonal({ ...personal, email: e.target.value })} />
          <input placeholder="Phone" style={getInputStyle("phone")} value={personal.phone} onChange={e => setPersonal({ ...personal, phone: e.target.value })} />
          <input placeholder="Gender" style={getInputStyle("gender")} value={personal.gender} onChange={e => setPersonal({ ...personal, gender: e.target.value })} />
          <input type="date" style={getInputStyle("dob")} value={personal.dob} onChange={e => setPersonal({ ...personal, dob: e.target.value })} />

          {/* Address */}
          <h4>Address Details</h4>
          {renderSelectWithOther(address.country, address.otherCountry, countries, "Select Country", "country", "otherCountry", setAddress)}
          {renderSelectWithOther(address.state, address.otherState, states, "Select State", "state", "otherState", setAddress)}
          {renderSelectWithOther(address.district, address.otherDistrict, districts, "Select District", "district", "otherDistrict", setAddress)}
          <input placeholder="Address Line" style={getInputStyle("line")} value={address.line} onChange={e => setAddress({ ...address, line: e.target.value })} />

          {/* 10th */}
          <h4>10th Details</h4>
          {renderSelectWithOther(education.tenth.school, education.tenth.otherSchool, schools, "Select School", "school", "otherSchool", (val) => setEducation(prev => ({ ...prev, tenth: { ...prev.tenth, ...val } })))}
          <input placeholder="Place" style={getInputStyle("tenthPlace")} value={education.tenth.place} onChange={e => setEducation(prev => ({ ...prev, tenth: { ...prev.tenth, place: e.target.value } }))} />
          <input placeholder="Percentage" style={getInputStyle("tenthPercentage")} value={education.tenth.percentage} onChange={e => setEducation(prev => ({ ...prev, tenth: { ...prev.tenth, percentage: e.target.value } }))} />

          {/* 12th */}
          <h4>12th Details</h4>
          {renderSelectWithOther(education.twelfth.school, education.twelfth.otherSchool, schools, "Select School", "school", "otherSchool", (val) => setEducation(prev => ({ ...prev, twelfth: { ...prev.twelfth, ...val } })))}
          <input placeholder="Place" style={getInputStyle("twelfthPlace")} value={education.twelfth.place} onChange={e => setEducation(prev => ({ ...prev, twelfth: { ...prev.twelfth, place: e.target.value } }))} />
          <input placeholder="Percentage" style={getInputStyle("twelfthPercentage")} value={education.twelfth.percentage} onChange={e => setEducation(prev => ({ ...prev, twelfth: { ...prev.twelfth, percentage: e.target.value } }))} />

          {/* UG */}
          <h4>UG Details</h4>
          {renderSelectWithOther(education.ug.university, education.ug.otherUniversity, universities, "Select University", "university", "otherUniversity", (val) => setEducation(prev => ({ ...prev, ug: { ...prev.ug, ...val } })))}
          {renderSelectWithOther(education.ug.college, education.ug.otherCollege, colleges, "Select College", "college", "otherCollege", (val) => setEducation(prev => ({ ...prev, ug: { ...prev.ug, ...val } })))}
          {renderSelectWithOther(education.ug.department, education.ug.otherDepartment, departments, "Select Department", "department", "otherDepartment", (val) => setEducation(prev => ({ ...prev, ug: { ...prev.ug, ...val } })))}
          <input placeholder="CGPA" style={getInputStyle("ugCgpa")} value={education.ug.cgpa} onChange={e => setEducation(prev => ({ ...prev, ug: { ...prev.ug, cgpa: e.target.value } }))} />
          <input placeholder="Graduation Year" style={getInputStyle("ugGraduationYear")} value={education.ug.graduationYear} onChange={e => setEducation(prev => ({ ...prev, ug: { ...prev.ug, graduationYear: e.target.value } }))} />
          <input placeholder="Place" style={getInputStyle("ugPlace")} value={education.ug.place} onChange={e => setEducation(prev => ({ ...prev, ug: { ...prev.ug, place: e.target.value } }))} />
          <select style={getInputStyle("ugActiveBacklogs")} value={education.ug.activeBacklogs} onChange={e => setEducation(prev => ({ ...prev, ug: { ...prev.ug, activeBacklogs: e.target.value } }))}>
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
