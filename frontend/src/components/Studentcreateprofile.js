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

  const countries = ["India","USA","UK","Canada","Australia","Germany","France","Italy","Japan","China","Brazil","Mexico","South Africa","Russia","Spain","Sweden","Norway","Switzerland","Netherlands","New Zealand","Other"];
  const states = ["Tamil Nadu","Kerala","Karnataka","Odisha","Gujarat","Haryana","Delhi","Manipur","Maharashtra","Other"];
  const districts = ["Chennai","Coimbatore","Madurai","Vellore","Tiruvannamalai","Kanchipuram","Tirunelveli","Chengalpattu","Karur","Sivagangai","Salem","Erode","Other"];
  const schools = ["Government High School","Government Higher Secondary School","Kendriya Vidyalaya (KV)","Jawahar Navodaya Vidyalaya","DAV School","Other"];
  const universities = ["Anna University","VIT","Annamalai","Karunya","Loyolo","Presidency","PSG","SRM","CIT","Vel Tech","IIT","Bharathidasan","Sathyabama","SASTRA","Thiruvalluvar","Other"];
  const colleges = ["VIT","Loyolo","Sathyabama","Coimbatore","Bharathidasan","IIT","Chennai","Vel Tech","SRM","Karunya","Presidency","PSG","Other"];
  const departments = ["CSE","IT","ECE","EEE","Mechanical","Civil","IOT","AI&ML","Hotel Management","AI","Other"];

  const getInputStyle = (field) => ({
    border: errors[field] ? "2px solid #ff4d4d" : "1px solid #ccc",
    padding: 10,
    borderRadius: 6,
    width: "100%",
    marginBottom: 10,
    fontSize: "14px"
  });

  const validate = () => {
    let tempErrors = {};

    if (!personal.name) tempErrors.name = "Required*";
    if (!personal.email) tempErrors.email = "Required*";
    if (!personal.phone) tempErrors.phone = "Required*";
    if (!personal.gender) tempErrors.gender = "Required*";
    if (!personal.dob) tempErrors.dob = "Required*";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length===0;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validate()) return;

    const payload = { personal, address, education };

    try{
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, payload, {headers:{Authorization:`Bearer ${token}`}});
      Swal.fire({icon:"success",title:"Profile Created Successfully!"}).then(()=>navigate("/view-profile"));
    }catch(err){
      Swal.fire({icon:"error",title:"Error",text: err.response?.data?.message || "Something went wrong"});
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Profile</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Section - Personal */}
          <div style={styles.section}>
            <h3 style={styles.title}>Personal Details</h3>

            <input placeholder="Full Name" style={getInputStyle("name")} value={personal.name} onChange={e=>setPersonal({...personal,name:e.target.value})} />
            <input placeholder="Email" style={getInputStyle("email")} value={personal.email} onChange={e=>setPersonal({...personal,email:e.target.value})} />
            <input placeholder="Phone Number" style={getInputStyle("phone")} value={personal.phone} onChange={e=>setPersonal({...personal,phone:e.target.value})} />
            
            <select style={getInputStyle("gender")} value={personal.gender} onChange={e=>setPersonal({...personal,gender:e.target.value})}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input type="date" style={getInputStyle("dob")} value={personal.dob} onChange={e=>setPersonal({...personal,dob:e.target.value})} />
          </div>

          {/* Section - Address */}
          <div style={styles.section}>
            <h3 style={styles.title}>Address Details</h3>

            <select style={getInputStyle("country")} value={address.country} onChange={e=>setAddress({...address,country:e.target.value})}>
              <option value="">Select Country</option>
              {countries.map((item)=> <option key={item}>{item}</option>)}
            </select>
            
            <input placeholder="Address Line" style={getInputStyle("line")} value={address.line} onChange={e=>setAddress({...address,line:e.target.value})} />
          </div>

          {/* Section - Education */}
          <div style={styles.section}>
            <h3 style={styles.title}>Education Details</h3>

            <input placeholder="10th School Name" style={getInputStyle("tenthSchool")} 
              value={education.tenth.school} 
              onChange={e=>setEducation({...education,tenth:{...education.tenth,school:e.target.value}})} 
            />
          </div>

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}


// ---------- STYLES ----------
const styles = {
  page: { 
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#ffcd47,#ff9850)"
  },
  formContainer: {
    background: "#fff",
    padding: 25,
    width: "450px",
    maxHeight: "90vh",
    borderRadius: 15,
    overflowY: "auto",
    boxShadow: "0 5px 18px rgba(0,0,0,0.2)"
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#2c7a7b",
    marginBottom: "20px",
    borderBottom: "3px solid #2c7a7b",
    paddingBottom: 10
  },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  section: {
    padding: "12px 0",
    borderBottom: "1px solid #eee"
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  button: {
    marginTop: 15,
    padding: "12px",
    background: "#16a34a",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s"
  }
};
