import React, { useState } from "react";
import Swal from "sweetalert2";

export default function CreateProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    country: "",
    city: "",
    pincode: "",
    qualification: "",
    college: "",
    cgpa: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});

  // ----------------- VALIDATION FUNCTION -----------------
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (form.phone.length < 10) newErrors.phone = "Phone must be 10 digits";

    if (!form.gender) newErrors.gender = "Select gender";

    if (!form.dob) newErrors.dob = "Enter date of birth";

    if (!form.address.trim()) newErrors.address = "Enter address";

    if (!form.country) newErrors.country = "Select your country";

    if (!form.city.trim()) newErrors.city = "Enter city";

    if (!form.pincode.trim()) newErrors.pincode = "Enter pincode";

    if (!form.qualification.trim()) newErrors.qualification = "Enter qualification";

    if (!form.college.trim()) newErrors.college = "Enter college name";

    if (!form.cgpa.trim()) newErrors.cgpa = "Enter CGPA / Percentage";

    if (!form.experience.trim()) newErrors.experience = "Enter experience or type Fresher";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // ----------------- SUBMIT FUNCTION -----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      Swal.fire({
        title: "Profile Saved!",
        text: "Your form has been successfully saved.",
        icon: "success",
        confirmButtonColor: "#007BFF",
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  // ----------------- STYLES -----------------
  const inputStyle = (field) => ({
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: errors[field] ? "2px solid red" : "1px solid #777",
    marginBottom: "6px",
  });

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Create Profile</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* ------- Personal -------- */}
          <h3 style={styles.section}>Personal Details</h3>

          <input name="name" placeholder="Full Name" style={inputStyle("name")} onChange={handleChange}/>
          {errors.name && <span style={styles.error}>{errors.name}</span>}

          <input name="email" placeholder="Email" style={inputStyle("email")} onChange={handleChange}/>
          {errors.email && <span style={styles.error}>{errors.email}</span>}

          <input name="phone" placeholder="Phone Number" style={inputStyle("phone")} onChange={handleChange}/>
          {errors.phone && <span style={styles.error}>{errors.phone}</span>}

          <select name="gender" style={inputStyle("gender")} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
          {errors.gender && <span style={styles.error}>{errors.gender}</span>}

          <input type="date" name="dob" style={inputStyle("dob")} onChange={handleChange}/>
          {errors.dob && <span style={styles.error}>{errors.dob}</span>}


          {/* ------- Address -------- */}
          <h3 style={styles.section}>Address Details</h3>

          <textarea name="address" placeholder="Full Address"
            style={{ ...inputStyle("address"), height: "70px" }} onChange={handleChange}
          />
          {errors.address && <span style={styles.error}>{errors.address}</span>}

          <input name="city" placeholder="City" style={inputStyle("city")} onChange={handleChange}/>
          {errors.city && <span style={styles.error}>{errors.city}</span>}

          <input name="pincode" placeholder="Pincode" style={inputStyle("pincode")} onChange={handleChange}/>
          {errors.pincode && <span style={styles.error}>{errors.pincode}</span>}

          <select name="country" style={inputStyle("country")} onChange={handleChange}>
            <option value="">Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Other</option>
          </select>
          {errors.country && <span style={styles.error}>{errors.country}</span>}


          {/* ------- Education -------- */}
          <h3 style={styles.section}>Education Details</h3>

          <input name="qualification" placeholder="Qualification (BE/B.Tech/BCA)" style={inputStyle("qualification")} onChange={handleChange}/>
          {errors.qualification && <span style={styles.error}>{errors.qualification}</span>}

          <input name="college" placeholder="College Name" style={inputStyle("college")} onChange={handleChange}/>
          {errors.college && <span style={styles.error}>{errors.college}</span>}

          <input name="cgpa" placeholder="CGPA / Percentage" style={inputStyle("cgpa")} onChange={handleChange}/>
          {errors.cgpa && <span style={styles.error}>{errors.cgpa}</span>}


          {/* ------- Experience -------- */}
          <h3 style={styles.section}>Experience</h3>

          <input name="experience" placeholder="Enter Experience or Type Fresher" style={inputStyle("experience")} onChange={handleChange}/>
          {errors.experience && <span style={styles.error}>{errors.experience}</span>}


          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}


// ----------------- PAGE UI STYLING -----------------
const styles = {
  page: {
    background: "linear-gradient(135deg,#020024,#0575E6,#00F260)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  formContainer: {
    width: "450px",
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  heading: {
    textAlign: "center",
    color: "#0575E6",
    marginBottom: "15px",
  },
  section: {
    marginTop: "15px",
    marginBottom: "8px",
    color: "#444",
    borderBottom: "2px solid #00C6FF",
    width: "fit-content",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    background: "#00A9FF",
    color: "white",
    fontSize: "18px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
  },
  error: {
    fontSize: "12px",
    color: "red",
    marginBottom: "5px",
  },
};
