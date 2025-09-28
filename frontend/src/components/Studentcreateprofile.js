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
    district: "",
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
      cgpa: "",
      graduationYear: "",
      place: "",
      activeBacklogs: "",
    },
  });

  const [errors, setErrors] = useState({});

  const countries = ["India", "USA", "UK", "Canada", "Australia", "Germany", "France", "Italy", "Japan", "China", "Brazil", "Mexico", "South Africa", "Russia", "Spain", "Sweden", "Norway", "Switzerland", "Netherlands", "New Zealand", "Other"];
  const states = ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra"];
  const districts = ["Chennai", "Coimbatore", "Madurai", "Vellore", "Tirunelveli", "Salem", "Erode"];
  const schools = ["Government HSS", "Kendriya Vidyalaya (KV)", "Jawahar Navodaya Vidyalaya", "DAV School", "Other"];
  const universities = ["Anna University", "VIT Vellore", "SRM Institute", "SASTRA University", "Other"];
  const colleges = ["Loyola College", "Presidency College", "PSG College of Technology", "Other"];
  const departments = ["CSE", "IT", "ECE", "EEE", "Mechanical", "Civil", "Other"];

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
    if (!address.district) tempErrors.district = true;
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
      address: { ...address, country: address.country === "Other" ? address.otherCountry : address.country },
      education: {
        tenth: { ...education.tenth, school: education.tenth.school === "Other" ? education.tenth.otherSchool : education.tenth.school },
        twelfth: { ...education.twelfth, school: education.twelfth.school === "Other" ? education.twelfth.otherSchool : education.twelfth.school },
        ug: {
          ...education.ug,
          university: education.ug.university === "Other" ? education.ug.otherUniversity : education.ug.university,
          college: education.ug.college === "Other" ? education.ug.otherCollege : education.ug.college,
          activeBacklogs: education.ug.activeBacklogs === "Yes" ? 1 : 0,
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
          <h4 style={styles.sectionHeading}>Personal Info</h4>
          <input placeholder="Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} style={getInputStyle("name")} />
          <input placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} style={getInputStyle("email")} />
          <input placeholder="Phone Number" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} style={getInputStyle("phone")} />
          <select value={personal.gender} onChange={(e) => setPersonal({ ...personal, gender: e.target.value })} style={getInputStyle("gender")}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" value={personal.dob} onChange={(e) => setPersonal({ ...personal, dob: e.target.value })} style={getInputStyle("dob")} />

          <h4 style={styles.sectionHeading}>Address</h4>
          <select value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} style={getInputStyle("country")}>
            <option value="">Select Country</option>
            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {address.country === "Other" && <input placeholder="Enter Country" value={address.otherCountry} onChange={(e) => setAddress({ ...address, otherCountry: e.target.value })} style={getInputStyle("otherCountry")} />}
          <select value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} style={getInputStyle("state")}>
            <option value="">Select State</option>
            {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          <select value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} style={getInputStyle("district")}>
            <option value="">Select District</option>
            {districts.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <textarea placeholder="Address Line" value={address.line} onChange={(e) => setAddress({ ...address, line: e.target.value })} style={{ ...getInputStyle("line"), height: 60, resize: "vertical" }} />

          <h4 style={styles.sectionHeading}>Education</h4>

          <h5 style={styles.subHeading}>10th</h5>
          <select value={education.tenth.school} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, school: e.target.value } })} style={getInputStyle("tenthSchool")}>
            <option value="">Select School</option>
            {schools.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {education.tenth.school === "Other" && <input placeholder="Enter School Name" value={education.tenth.otherSchool} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, otherSchool: e.target.value } })} style={getInputStyle("tenthOtherSchool")} />}
          <input placeholder="Place/City" value={education.tenth.place} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, place: e.target.value } })} style={getInputStyle("tenthPlace")} />
          <input placeholder="Percentage" value={education.tenth.percentage} onChange={(e) => setEducation({ ...education, tenth: { ...education.tenth, percentage: e.target.value } })} style={getInputStyle("tenthPercentage")} />

          <h5 style={styles.subHeading}>12th</h5>
          <select value={education.twelfth.school} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, school: e.target.value } })} style={getInputStyle("twelfthSchool")}>
            <option value="">Select School</option>
            {schools.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
          {education.twelfth.school === "Other" && <input placeholder="Enter School Name" value={education.twelfth.otherSchool} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, otherSchool: e.target.value } })} style={getInputStyle("twelfthOtherSchool")} />}
          <input placeholder="Place/City" value={education.twelfth.place} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, place: e.target.value } })} style={getInputStyle("twelfthPlace")} />
          <input placeholder="Percentage" value={education.twelfth.percentage} onChange={(e) => setEducation({ ...education, twelfth: { ...education.twelfth, percentage: e.target.value } })} style={getInputStyle("twelfthPercentage")} />

          <h5 style={styles.subHeading}>UG</h5>
          <select value={education.ug.university} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, university: e.target.value } })} style={getInputStyle("ugUniversity")}>
            <option value="">Select University</option>
            {universities.map((u, i) => <option key={i} value={u}>{u}</option>)}
          </select>
          {education.ug.university === "Other" && <input placeholder="Enter University Name" value={education.ug.otherUniversity} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherUniversity: e.target.value } })} style={getInputStyle("ugOtherUniversity")} />}
          <input placeholder="Place/City" value={education.ug.place} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, place: e.target.value } })} style={getInputStyle("ugPlace")} />
          <select value={education.ug.college} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, college: e.target.value } })} style={getInputStyle("ugCollege")}>
            <option value="">Select College</option>
            {colleges.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          {education.ug.college === "Other" && <input placeholder="Enter College Name" value={education.ug.otherCollege} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, otherCollege: e.target.value } })} style={getInputStyle("ugOtherCollege")} />}
          <select value={education.ug.department} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, department: e.target.value } })} style={getInputStyle("ugDepartment")}>
            <option value="">Select Department</option>
            {departments.map((d, i) => <option key={i} value={d}>{d}</option>)}
          </select>
          <input placeholder="CGPA" value={education.ug.cgpa} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, cgpa: e.target.value } })} style={getInputStyle("ugCgpa")} />
          <input placeholder="Graduation Year" value={education.ug.graduationYear} onChange={(e) => setEducation({ ...education, ug: { ...education.ug, graduationYear: e.target.value } })} style={getInputStyle("ugGraduationYear")} />
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

  // Headings style
  heading: { textAlign: "center", fontSize: "26px", fontWeight: "bold", color: "#27ae60", marginBottom: "20px", textDecoration: "underline" },
  sectionHeading: { fontSize: "20px", fontWeight: "bold", color: "#2c3e50", marginTop: "15px", marginBottom: "10px", borderBottom: "2px solid #27ae60", paddingBottom: "5px" },
  subHeading: { fontSize: "16px", fontWeight: "bold", color: "#34495e", marginTop: "10px", marginBottom: "5px" },
};
