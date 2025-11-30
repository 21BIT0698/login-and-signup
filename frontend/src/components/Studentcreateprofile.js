import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();

  const [personal, setPersonal] = useState({
    name: "", email: "", phone: "", gender: "", dob: ""
  });

  const [address, setAddress] = useState({
    state: "", otherState: "", district: "", otherDistrict: "", country: "", otherCountry: "", line: ""
  });

  const [education, setEducation] = useState({
    tenth: { school: "", otherSchool: "", place: "", percentage: "" },
    twelfth: { school: "", otherSchool: "", place: "", percentage: "" },
    ug: { university: "", otherUniversity: "", college: "", otherCollege: "", department: "", otherDepartment: "", cgpa: "", graduationYear: "", place: "", activeBacklogs: "" }
  });

  const [errors, setErrors] = useState({});

  const countries = ["India","USA","UK","Canada","Australia","Germany","France","Japan","China","Brazil","Russia","South Africa","Other"];
  const states = ["Tamil Nadu","Kerala","Karnataka","Maharashtra","Delhi","Gujarat","Other"];
  const districts = ["Chennai","Vellore","Tiruvannamalai","Coimbatore","Madurai","Salem","Other"];
  const schools = ["Government High School","KV","DAV","Jawahar Navodaya","Private School","Other"];
  const universities = ["Anna University","VIT","SRM","IIT","SASTRA","Thiruvalluvar","Other"];
  const colleges = ["VIT","SRM","CIT","Government","Private College","Other"];
  const departments = ["CSE","IT","ECE","EEE","Mechanical","Civil","AI&ML","IoT","Other"];

  const getInputStyle = (field) => ({
    border: errors[field] ? "2px solid red" : "1px solid #ccc",
    padding: 8,
    borderRadius: 6,
    width: "100%",
    marginBottom: errors[field] ? 2 : 10
  });

  const validate = () => {
    let tempErrors = {};

    if (!personal.name) tempErrors.name = "Required";
    if (!personal.email) tempErrors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(personal.email)) tempErrors.email = "Invalid email";

    if (!personal.phone) tempErrors.phone = "Required";
    else if (!/^\d{10}$/.test(personal.phone)) tempErrors.phone = "Must be 10 digits";

    if (!personal.gender) tempErrors.gender = "Required";
    if (!personal.dob) tempErrors.dob = "Required";

    if (!address.country) tempErrors.country = "Required";
    if (address.country==="Other" && !address.otherCountry) tempErrors.otherCountry = "Required";

    if (!address.state) tempErrors.state = "Required";
    if (address.state==="Other" && !address.otherState) tempErrors.otherState = "Required";

    if (!address.district) tempErrors.district = "Required";
    if (address.district==="Other" && !address.otherDistrict) tempErrors.otherDistrict = "Required";

    if (!address.line) tempErrors.line = "Required";

    if (!education.tenth.school) tempErrors.tenthSchool = "Required";
    if (education.tenth.school==="Other" && !education.tenth.otherSchool) tempErrors.tenthOtherSchool="Required";

    if (!education.tenth.place) tempErrors.tenthPlace="Required";
    if (!education.tenth.percentage) tempErrors.tenthPercentage="Required";

    if (!education.twelfth.school) tempErrors.twelfthSchool = "Required";
    if (education.twelfth.school==="Other" && !education.twelfth.otherSchool) tempErrors.twelfthOtherSchool="Required";

    if (!education.twelfth.place) tempErrors.twelfthPlace="Required";
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage="Required";

    if (!education.ug.university) tempErrors.ugUniversity="Required";
    if (education.ug.university==="Other" && !education.ug.otherUniversity) tempErrors.ugOtherUniversity="Required";

    if (!education.ug.college) tempErrors.ugCollege="Required";
    if (education.ug.college==="Other" && !education.ug.otherCollege) tempErrors.ugOtherCollege="Required";

    if (!education.ug.department) tempErrors.ugDepartment="Required";
    if (education.ug.department==="Other" && !education.ug.otherDepartment) tempErrors.ugOtherDepartment="Required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length===0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { personal, address, education };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload , { headers:{ Authorization: `Bearer ${token}` } });
      Swal.fire({ icon:"success", title:"Profile Created Successfully!" })
      .then(()=> navigate("/view-profile"));
    } catch(err) {
      Swal.fire({ icon:"error", text: err.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        
        <h2 style={styles.heading}>Create Profile</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>

          <label><b>Name *</b></label>
          <input style={getInputStyle("name")} value={personal.name} onChange={(e)=>setPersonal({...personal, name:e.target.value})}/>
          {errors.name && <small style={{color:"red"}}>{errors.name}</small>}

          <label><b>Email *</b></label>
          <input style={getInputStyle("email")} value={personal.email} onChange={(e)=>setPersonal({...personal, email:e.target.value})}/>
          {errors.email && <small style={{color:"red"}}>{errors.email}</small>}

          <label><b>Phone *</b></label>
          <input style={getInputStyle("phone")} value={personal.phone} onChange={(e)=>setPersonal({...personal, phone:e.target.value})}/>
          {errors.phone && <small style={{color:"red"}}>{errors.phone}</small>}

          <label><b>Gender *</b></label>
          <select style={getInputStyle("gender")} value={personal.gender} onChange={(e)=>setPersonal({...personal, gender:e.target.value})}>
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <small style={{color:"red"}}>{errors.gender}</small>}

          <label><b>Date of Birth *</b></label>
          <input type="date" style={getInputStyle("dob")} value={personal.dob} onChange={(e)=>setPersonal({...personal, dob:e.target.value})}/>
          {errors.dob && <small style={{color:"red"}}>{errors.dob}</small>}

          <button type="submit" style={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight:"100vh", background:"#ffeaa7"
  },
  formContainer:{
    width:450, background:"#fff", padding:20, borderRadius:12,
    boxShadow:"0px 4px 15px rgba(0,0,0,0.2)"
  },
  button:{ padding:10, background:"#22a842", color:"white",
    border:"none", borderRadius:10, marginTop:20, cursor:"pointer", fontWeight:600 }
};
