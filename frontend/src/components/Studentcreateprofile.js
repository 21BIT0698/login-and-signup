import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();
  const [personal, setPersonal] = useState({ name:"", email:"" });
  const [address, setAddress] = useState({ state:"", city:"", country:"", line:"" });
  const [education, setEducation] = useState({
    tenth:{school:"", place:"", percentage:""},
    twelfth:{school:"", place:"", percentage:""},
    ug:{university:"", college:"", department:"", cgpa:"", graduationYear:"", place:""}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.REACT_APP_API_URL}/profile`, { personal, address, education }, { headers:{ Authorization:`Bearer ${token}` } });
      Swal.fire({ icon:'success', title:'Profile Created', confirmButtonColor:'#2ecc71' }).then(()=>navigate("/view-profile"));
    }catch(err){
      Swal.fire({ icon:'error', title:'Error', text: err.response?.data?.message || "Something went wrong", confirmButtonColor:'#e74c3c' });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h4>Personal Info</h4>
          <input placeholder="Name" value={personal.name} onChange={e=>setPersonal({...personal,name:e.target.value})} style={styles.input}/>
          <input placeholder="Email" value={personal.email} onChange={e=>setPersonal({...personal,email:e.target.value})} style={styles.input}/>
          
          <h4>Address</h4>
          <input placeholder="State" value={address.state} onChange={e=>setAddress({...address,state:e.target.value})} style={styles.input}/>
          <input placeholder="City" value={address.city} onChange={e=>setAddress({...address,city:e.target.value})} style={styles.input}/>
          <input placeholder="Country" value={address.country} onChange={e=>setAddress({...address,country:e.target.value})} style={styles.input}/>
          <input placeholder="Address Line" value={address.line} onChange={e=>setAddress({...address,line:e.target.value})} style={styles.input}/>

          <h4>Education</h4>
          <h5>10th</h5>
          <input placeholder="School" value={education.tenth.school} onChange={e=>setEducation({...education,tenth:{...education.tenth,school:e.target.value}})} style={styles.input}/>
          <input placeholder="Place" value={education.tenth.place} onChange={e=>setEducation({...education,tenth:{...education.tenth,place:e.target.value}})} style={styles.input}/>
          <input placeholder="Percentage" value={education.tenth.percentage} onChange={e=>setEducation({...education,tenth:{...education.tenth,percentage:e.target.value}})} style={styles.input}/>

          <h5>12th</h5>
          <input placeholder="School" value={education.twelfth.school} onChange={e=>setEducation({...education,twelfth:{...education.twelfth,school:e.target.value}})} style={styles.input}/>
          <input placeholder="Place" value={education.twelfth.place} onChange={e=>setEducation({...education,twelfth:{...education.twelfth,place:e.target.value}})} style={styles.input}/>
          <input placeholder="Percentage" value={education.twelfth.percentage} onChange={e=>setEducation({...education,twelfth:{...education.twelfth,percentage:e.target.value}})} style={styles.input}/>

          <h5>UG</h5>
          <input placeholder="University" value={education.ug.university} onChange={e=>setEducation({...education,ug:{...education.ug,university:e.target.value}})} style={styles.input}/>
          <input placeholder="College" value={education.ug.college} onChange={e=>setEducation({...education,ug:{...education.ug,college:e.target.value}})} style={styles.input}/>
          <input placeholder="Department" value={education.ug.department} onChange={e=>setEducation({...education,ug:{...education.ug,department:e.target.value}})} style={styles.input}/>
          <input placeholder="CGPA" value={education.ug.cgpa} onChange={e=>setEducation({...education,ug:{...education.ug,cgpa:e.target.value}})} style={styles.input}/>
          <input placeholder="Graduation Year" value={education.ug.graduationYear} onChange={e=>setEducation({...education,ug:{...education.ug,graduationYear:e.target.value}})} style={styles.input}/>
          <input placeholder="Place" value={education.ug.place} onChange={e=>setEducation({...education,ug:{...education.ug,place:e.target.value}})} style={styles.input}/>

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",background:"linear-gradient(to right,#f7971e,#ffd200)"},
  formContainer:{background:"#fff",padding:20,borderRadius:12,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",width:400,overflowY:"scroll",height:"90%"},
  form:{display:"flex",flexDirection:"column",gap:10},
  input:{padding:8,borderRadius:6,border:"1px solid #ccc",outline:"none"},
  button:{padding:10,marginTop:10,backgroundColor:"#2ecc71",color:"white",border:"none",borderRadius:8,cursor:"pointer"}
};
