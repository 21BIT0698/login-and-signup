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

  const handleEnterNext = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      form.elements[index + 1]?.focus();
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let tempErrors = {};

    // ---------------- Personal ----------------
    if (!personal.name) tempErrors.name = "Name is required";
    if (!personal.email) tempErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) tempErrors.email = "Invalid email";
    if (!personal.phone) tempErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(personal.phone)) tempErrors.phone = "Phone must be 10 digits";
    if (!personal.gender) tempErrors.gender = "Gender is required";
    if (!personal.dob) tempErrors.dob = "Date of Birth is required";

    // ---------------- Address ----------------
    if (!address.country) tempErrors.country = "Country required";
    if (address.country === "Other" && !address.otherCountry) tempErrors.otherCountry = "Enter country";
    if (!address.state) tempErrors.state = "State required";
    if (address.state === "Other" && !address.otherState) tempErrors.otherState = "Enter state";
    if (!address.district) tempErrors.district = "District required";
    if (address.district === "Other" && !address.otherDistrict) tempErrors.otherDistrict = "Enter district";
    if (!address.line) tempErrors.line = "Address line required";

    // ---------------- 10th ----------------
    if (!education.tenth.school) tempErrors.tenthSchool = "10th School required";
    if (education.tenth.school === "Other" && !education.tenth.otherSchool) tempErrors.tenthOtherSchool = "Enter school name";
    if (!education.tenth.place) tempErrors.tenthPlace = "10th Place required";
    if (!education.tenth.percentage) tempErrors.tenthPercentage = "10th Percentage required";
    else if (isNaN(education.tenth.percentage) || education.tenth.percentage < 0 || education.tenth.percentage > 100) tempErrors.tenthPercentage = "Enter valid %";

    // ---------------- 12th ----------------
    if (!education.twelfth.school) tempErrors.twelfthSchool = "12th School required";
    if (education.twelfth.school === "Other" && !education.twelfth.otherSchool) tempErrors.twelfthOtherSchool = "Enter school name";
    if (!education.twelfth.place) tempErrors.twelfthPlace = "12th Place required";
    if (!education.twelfth.percentage) tempErrors.twelfthPercentage = "12th Percentage required";
    else if (isNaN(education.twelfth.percentage) || education.twelfth.percentage < 0 || education.twelfth.percentage > 100) tempErrors.twelfthPercentage = "Enter valid %";

    // ---------------- UG ----------------
    if (!education.ug.university) tempErrors.ugUniversity = "University required";
    if (education.ug.university === "Other" && !education.ug.otherUniversity) tempErrors.ugOtherUniversity = "Enter university";
    if (!education.ug.college) tempErrors.ugCollege = "College required";
    if (education.ug.college === "Other" && !education.ug.otherCollege) tempErrors.ugOtherCollege = "Enter college";
    if (!education.ug.department) tempErrors.ugDepartment = "Department required";
    if (education.ug.department === "Other" && !education.ug.otherDepartment) tempErrors.ugOtherDepartment = "Enter department";
    if (!education.ug.cgpa) tempErrors.ugCgpa = "CGPA required";
    else if (isNaN(education.ug.cgpa) || education.ug.cgpa < 0 || education.ug.cgpa > 10) tempErrors.ugCgpa = "CGPA must be 0-10";
    if (!education.ug.graduationYear) tempErrors.ugGraduationYear = "Graduation year required";
    if (!education.ug.place) tempErrors.ugPlace = "Place required";
    if (!education.ug.activeBacklogs) tempErrors.ugActiveBacklogs = "Select backlogs";

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
          {/* ... your input fields with getInputStyle() ... */}
          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  page: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(to right,#f7971e,#ffd200)" },
  formContainer: { background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: 400, overflowY: "scroll", height: "90%" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 6, border: "1px solid #ccc", outline: "none" },
  button: { padding: 10, marginTop: 10, backgroundColor: "#2ecc71", color: "white", border: "none", borderRadius: 8, cursor: "pointer" },
  heading: { textAlign: "center", fontSize: "28px", fontWeight: "900", color: "#27ae60", marginBottom: "25px", borderBottom: "3px solid #27ae60", paddingBottom: "10px" }
};
