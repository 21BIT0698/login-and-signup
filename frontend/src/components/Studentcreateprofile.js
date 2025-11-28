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

  const countries = ["India","USA","UK","Canada","Australia","Germany","France","Italy","Japan","China","Brazil","Mexico","South Africa","Russia","Spain","Sweden","Norway","Switzerland","Netherlands","New Zealand","Other"];
  const states = ["Tamil Nadu","Kerala","Karnataka","Odisha","Gujarat","Haryana","Delhi","Manipur","Maharashtra","Other"];
  const districts = ["Chennai","Coimbatore","Madurai","Vellore","Tiruvannamalai","Kanchipuram","Tirunelveli","Chengalpattu","Karur","Sivagangai","Salem","Erode","Other"];
  const schools = ["Government High School","Government Higher Secondary School","Kendriya Vidyalaya (KV)","Jawahar Navodaya Vidyalaya","DAV School","Other"];
  const universities = ["Anna University","VIT","Annamalai","Karunya","Loyolo","Presidency","PSG","SRM","CIT","Vel Tech","IIT","Bharathidasan","Sathyabama","SASTRA","Thiruvalluvar","Other"];
  const colleges = ["VIT","Loyolo","Sathyabama","Coimbatore","Bharathidasan","IIT","Chennai","Vel Tech","SRM","Karunya","Presidency","PSG","Other"];
  const departments = ["CSE","IT","ECE","EEE","Mechanical","Civil","IOT","AI&ML","Hotel Management","AI","Other"];

  const validate = () => {
    let tempErrors = {};

    if (!personal.name) tempErrors.name = "Required";
    if (!personal.email) tempErrors.email = "Required";
    if (!personal.phone) tempErrors.phone = "Required";
    if (!personal.dob) tempErrors.dob = "Required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      icon: "success",
      title: "Profile Saved!",
      timer: 1500,
      showConfirmButton: false
    }).then(() => navigate("/view-profile"));
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
          
          {/* ---------------- PERSONAL ---------------- */}
          <b>Personal Details</b>

          <input placeholder="Name" value={personal.name} style={getInputStyle("name")}
            onChange={(e)=> setPersonal({...personal,name:e.target.value})} />

          <input placeholder="Email" value={personal.email} style={getInputStyle("email")}
            onChange={(e)=> setPersonal({...personal,email:e.target.value})} />

          <input placeholder="Phone" value={personal.phone} style={getInputStyle("phone")}
            onChange={(e)=> setPersonal({...personal,phone:e.target.value})} />

          <select value={personal.gender} style={getInputStyle("gender")}
            onChange={(e)=> setPersonal({...personal,gender:e.target.value})}>
            <option value="">Select Gender</option>
            <option>Female</option><option>Male</option><option>Other</option>
          </select>

          <input type="date" value={personal.dob} style={getInputStyle("dob")}
            onChange={(e)=> setPersonal({...personal,dob:e.target.value})}/>
          
          {/* ---------------- ADDRESS ---------------- */}
          <b style={{marginTop:15}}>Address</b>

          <select value={address.country} style={getInputStyle("country")}
            onChange={(e)=> setAddress({...address,country:e.target.value})}>
            <option value="">Select Country</option>
            {countries.map(c=> <option key={c}>{c}</option>)}
          </select>

          {address.country==="Other" && (
            <input placeholder="Enter Country" style={getInputStyle("otherCountry")}
            onChange={(e)=> setAddress({...address,otherCountry:e.target.value})}/>
          )}

          <select value={address.state} style={getInputStyle("state")}
            onChange={(e)=> setAddress({...address,state:e.target.value})}>
            <option value="">Select State</option>
            {states.map(s=> <option key={s}>{s}</option>)}
          </select>

          {address.state==="Other" && (
            <input placeholder="Enter State" style={getInputStyle("otherState")}
            onChange={(e)=> setAddress({...address,otherState:e.target.value})}/>
          )}

          <select value={address.district} style={getInputStyle("district")}
            onChange={(e)=> setAddress({...address,district:e.target.value})}>
            <option value="">Select District</option>
            {districts.map(d=> <option key={d}>{d}</option>)}
          </select>

          {address.district==="Other" && (
            <input placeholder="Enter District" style={getInputStyle("otherDistrict")}
            onChange={(e)=> setAddress({...address,otherDistrict:e.target.value})}/>
          )}

          <input placeholder="Address Line" value={address.line} style={getInputStyle("line")}
            onChange={(e)=> setAddress({...address,line:e.target.value})} />

          {/* ---------------- EDUCATION ---------------- */}
          <b style={{marginTop:15}}>10th Education</b>

          <select value={education.tenth.school} style={getInputStyle("tenthSchool")}
            onChange={(e)=> setEducation({...education,tenth:{...education.tenth,school:e.target.value}})}>
            <option value="">Select School</option>
            {schools.map(s=><option key={s}>{s}</option>)}
          </select>

          {education.tenth.school==="Other" && (
            <input placeholder="Enter School" style={getInputStyle("tenthOtherSchool")}
            onChange={(e)=> setEducation({...education,tenth:{...education.tenth,otherSchool:e.target.value}})} />
          )}

          <input placeholder="Place" value={education.tenth.place}
            style={getInputStyle("tenthPlace")}
            onChange={(e)=> setEducation({...education,tenth:{...education.tenth,place:e.target.value}})} />

          <input placeholder="Percentage" value={education.tenth.percentage}
            style={getInputStyle("tenthPercentage")}
            onChange={(e)=> setEducation({...education,tenth:{...education.tenth,percentage:e.target.value}})} />

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}


// ---------------- STYLES ----------------
const styles = {
  page: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh",
    background:"linear-gradient(to right,#f7971e,#ffd200)" },

  formContainer:{ width:"450px", background:"#fff", padding:20, borderRadius:12,
    boxShadow:"0 4px 12px rgba(0,0,0,0.1)", height:"90vh", overflowY:"auto" },

  form:{ display:"flex", flexDirection:"column", gap:10 },

  input:{ padding:8, borderRadius:6, outline:"none" },

  button:{ marginTop:20, padding:10, background:"#2ecc71", color:"#fff", border:"none",
    borderRadius:8, cursor:"pointer", fontWeight:"bold" },

  heading:{ textAlign:"center", fontSize:"26px", fontWeight:"bold",
    color:"#27ae60", marginBottom:20, borderBottom:"3px solid #27ae60", paddingBottom:8 }
};
