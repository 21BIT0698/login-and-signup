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

  const countries = ["India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Italy", "Japan", "China", "Brazil", "Mexico", "South Africa", "Russia", "Spain", "Sweden", "Norway", "Switzerland", "Netherlands", "New Zealand", "Other"];
  const states = ["Tamil Nadu", "Kerala", "Karnataka", "Odisha","Gujarat","Haryana","Delhi","Manipur","Maharashtra", "Other"];
  const districts = ["Chennai", "Coimbatore", "Madurai", "Vellore","tiruvannamalai","kanjipuram","tirunelveli","chengalpattu", "Tirunelveli","karur","sivagangai", "Salem","coimbatore", "Erode", "Other"];
  const schools = ["Governmanet High School","Government Higher Secondary School", "Kendriya Vidyalaya (KV)", "Jawahar Navodaya Vidyalaya", "DAV School", "Other"];
  const universities = ["Anna University", "VIT", "Annamalai","Karunya","Loyolo","Presidency","PSG","SRM","CIT","Vel Tech","IIT","Bharathidasan","Sathyabama", "SASTRA","Thiruvallluvar", "Other"];
  const colleges = ["Vellore Instuite of Technology","Loyolo Instuite of Technology","Sathyabama Instuite of Science and Technology","Coimbatore Instuite of Technology","Barathidasan arts and science","Indian Instuite Of Technology","Chennai Instuite of Technology","Vel Tech engineering college","SRM Instuite of Technology","karunya Instuite of Technology","Presidency college", "Presidency College", "PSG College of Technology", "Other"];
  const departments = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "IOT","AI&ML","Hotel Management","AI","Other"];

  // Move to next input on Enter
  const handleEnterNext = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!personal.name) tempErrors.name = true;
    if (!personal.email) tempErrors.email = true;
    if (!personal.phone) tempErrors.phone = true;
    if (!personal.gender) tempErrors.gender = true;
    if (!personal.dob) tempErrors.dob = true;

    if (!address.country) tempErrors.country = true;
    if (address.country === "Other" && !address.otherCountry) tempErrors.otherCountry = true;
    if (!address.state) tempErrors.state = true;
    if (address.state === "Other" && !address.otherState) tempErrors.otherState = true;
    if (!address.district) tempErrors.district = true;
    if (address.district === "Other" && !address.otherDistrict) tempErrors.otherDistrict = true;
    if (!address.line) tempErrors.line = true;

    if (!education.tenth.school) tempErrors.tenthSchool = true;
    if (education.tenth.school === "Other" && !education.tenth.otherSchool) tempErrors.tenthOtherSchool = true;
    if (!education.tenth.place) tempErrors.tenthPlace = true;
    if (!education.tenth.percentage) tempErrors.tenthPercentage = true;

    if (!education.twelfth.school) tempErrors.twelfthSchool = true;
    if (education.twelfth.school === "Other" && !education.twelfth.otherSchool) tempErrors.twelfthOtherSchool = true;
    if (!education.twelfth.place) tempErrors.twelfthPlace = true;
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage = true;

    if (!education.ug.university) tempErrors.ugUniversity = true;
    if (education.ug.university === "Other" && !education.ug.otherUniversity) tempErrors.ugOtherUniversity = true;
    if (!education.ug.college) tempErrors.ugCollege = true;
    if (education.ug.college === "Other" && !education.ug.otherCollege) tempErrors.ugOtherCollege = true;
    if (!education.ug.department) tempErrors.ugDepartment = true;
    if (education.ug.department === "Other" && !education.ug.otherDepartment) tempErrors.ugOtherDepartment = true;
    if (!education.ug.cgpa) tempErrors.ugCgpa = true;
    if (!education.ug.graduationYear) tempErrors.ugGraduationYear = true;
    if (!education.ug.place) tempErrors.ugPlace = true;
    if (!education.ug.activeBacklogs) tempErrors.ugActiveBacklogs = true;

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
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || "Something went wrong", confirmButtonColor: "#e74c3c" });
    }
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

          {/* Personal Info */}
          <h4 style={styles.sectionHeading}>Personal Information</h4>
          <input placeholder="Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} style={getInputStyle("name")} onKeyDown={handleEnterNext} />
          <input placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} style={getInputStyle("email")} onKeyDown={handleEnterNext} />
          <input placeholder="Phone Number" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} style={getInputStyle("phone")} onKeyDown={handleEnterNext} />
          <select value={personal.gender} onChange={(e) => setPersonal({ ...personal, gender: e.target.value })} style={getInputStyle("gender")}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="DD-MM-YYYY" value={personal.dob} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} style={getInputStyle("dob")} onKeyDown={handleEnterNext} />

          {/* Address */}
          <h4 style={styles.sectionHeading}>Address</h4>
          <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} style={getInputStyle("country")} onKeyDown={handleEnterNext}>
            <option value="">Select Country</option>
            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {address.country === "Other" && <input placeholder="Enter Country" value={address.otherCountry} onChange={(e) => setAddress({ ...address, otherCountry: e.target.value })} style={getInputStyle("otherCountry")} onKeyDown={handleEnterNext} />}

          <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={getInputStyle("state")} onKeyDown={handleEnterNext}>
            <option value="">Select State</option>
            {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {address.state === "Other" && <input placeholder="Enter State" value={address.otherState} onChange={(e) => setAddress({ ...address, otherState: e.target.value })} style={getInputStyle("otherState")} onKeyDown={handleEnterNext} />}

          <select value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} style={getInputStyle("district")} onKeyDown={handleEnterNext}>
            <option value="">Select District</option>
            {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          {address.district === "Other" && <input placeholder="Enter District" value={address.otherDistrict} onChange={(e) => setAddress({ ...address, otherDistrict: e.target.value })} style={getInputStyle("otherDistrict")} onKeyDown={handleEnterNext} />}

          <textarea placeholder="Address Line" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} style={{ ...getInputStyle("line"), height: 60, resize: "vertical" }} onKeyDown={handleEnterNext} />

          {/* Education */}
          <h4 style={styles.sectionHeading}>Education</h4>

          {/* 10th */}
          <h5 style={styles.subHeading}>10th Education</h5>
          <select value={education.tenth.school} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, school: e.target.value } })} style={getInputStyle("tenthSchool")} onKeyDown={handleEnterNext}>
            <option value="">Select School</option>
            {schools.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {education.tenth.school === "Other" && <input placeholder="Enter School Name" value={education.tenth.otherSchool} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, otherSchool: e.target.value } })} style={getInputStyle("tenthOtherSchool")} onKeyDown={handleEnterNext} />}
          <input placeholder="Place" value={education.tenth.place} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, place: e.target.value } })} style={getInputStyle("tenthPlace")} onKeyDown={handleEnterNext} />
          <input placeholder="Percentage" value={education.tenth.percentage} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, percentage: e.target.value } })} style={getInputStyle("tenthPercentage")} onKeyDown={handleEnterNext} />

          {/* 12th */}
          <h5 style={styles.subHeading}>12th Education</h5>
          <select value={education.twelfth.school} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, school: e.target.value } })} style={getInputStyle("twelfthSchool")} onKeyDown={handleEnterNext}>
            <option value="">Select School</option>
            {schools.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {education.twelfth.school === "Other" && <input placeholder="Enter School Name" value={education.twelfth.otherSchool} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, otherSchool: e.target.value } })} style={getInputStyle("twelfthOtherSchool")} onKeyDown={handleEnterNext} />}
          <input placeholder="Place" value={education.twelfth.place} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, place: e.target.value } })} style={getInputStyle("twelfthPlace")} onKeyDown={handleEnterNext} />
          <input placeholder="Percentage" value={education.twelfth.percentage} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, percentage: e.target.value } })} style={getInputStyle("twelfthPercentage")} onKeyDown={handleEnterNext} />

          {/* UG */}
          <h5 style={styles.subHeading}>UG Education</h5>
          <select value={education.ug.university} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, university: e.target.value } })} style={getInputStyle("ugUniversity")} onKeyDown={handleEnterNext}>
            <option value="">Select University</option>
            {universities.map((u, i) => <option key={i} value={u}>{u}</option>)}
          </select>
          {education.ug.university === "Other" && <input placeholder="Enter University Name" value={education.ug.otherUniversity} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherUniversity: e.target.value } })} style={getInputStyle("ugOtherUniversity")} onKeyDown={handleEnterNext} />}
          <input placeholder="Place/City" value={education.ug.place} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, place: e.target.value } })} style={getInputStyle("ugPlace")} onKeyDown={handleEnterNext} />
          <select value={education.ug.college} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, college: e.target.value } })} style={getInputStyle("ugCollege")} onKeyDown={handleEnterNext}>
            <option value="">Select College</option>
            {colleges.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {education.ug.college === "Other" && <input placeholder="Enter College Name" value={education.ug.otherCollege} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherCollege: e.target.value } })} style={getInputStyle("ugOtherCollege")} onKeyDown={handleEnterNext} />}
          <select value={education.ug.department} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, department: e.target.value } })} style={getInputStyle("ugDepartment")} onKeyDown={handleEnterNext}>
            <option value="">Select Department</option>
            {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          {education.ug.department === "Other" && <input placeholder="Enter Department" value={education.ug.otherDepartment} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherDepartment: e.target.value } })} style={getInputStyle("ugOtherDepartment")} onKeyDown={handleEnterNext} />}
          <input placeholder="CGPA" value={education.ug.cgpa} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, cgpa: e.target.value } })} style={getInputStyle("ugCgpa")} onKeyDown={handleEnterNext} />
          <input placeholder="Graduation Year" value={education.ug.graduationYear} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, graduationYear: e.target.value } })} style={getInputStyle("ugGraduationYear")} onKeyDown={handleEnterNext} />
          <select value={education.ug.activeBacklogs} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, activeBacklogs: e.target.value } })} style={getInputStyle("ugActiveBacklogs")}>
            <option value="">Any Active Backlogs?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}




const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(to right,#f7971e,#ffd200)" },
  formContainer: { background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 400, overflowY: "scroll", height: "90%" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", outline: "none" },
  button: { padding: 10, marginTop: 10, backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: 8, cursor: "pointer" },

  heading: { 
    textAlign: "center", 
    fontSize: "28px", 
    fontWeight: "900", 
    color: "#27ae60", 
    marginBottom: "25px", 
    borderBottom: "3px solid #27ae60", 
    paddingBottom: "10px" 
  },

  sectionHeading: { 
    fontSize: "20px", 
    fontWeight: "700", 
    color: "#2c3e50", 
    marginTop: "20px", 
    marginBottom: "15px", 
    borderBottom: "2px solid #27ae60", 
    paddingBottom: "5px" 
  },

  subHeading: { 
    fontSize: "16px", 
    fontWeight: "600", 
    color: "#34495e", 
    marginTop: "10px", 
    marginBottom: "8px" 
  }
};
