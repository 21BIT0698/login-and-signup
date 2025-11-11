// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useNavigate, Link } from "react-router-dom";
// // import Swal from "sweetalert2"; // ✅ Import SweetAlert2

// // export default function Signup() {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
// //         name,
// //         email,
// //         password,
// //       });

// //       // ✅ SweetAlert2 success popup
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Signup Successful',
// //         text: 'You can login now!',
// //         confirmButtonColor: '#2ecc71',
// //       }).then(() => {
// //         navigate("/login"); // Navigate after popup
// //       });
// //     } catch (err) {
// //       // ✅ SweetAlert2 error popup
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Signup Failed',
// //         text: err.response?.data?.message || "Something went wrong!",
// //         confirmButtonColor: '#e74c3c',
// //       });
// //     }
// //   };

// //   return (
// //     <div style={styles.page}>
// //       <div style={styles.formContainer}>
// //         <h2 style={{ color: "#2c3e50" }}>Signup</h2>
// //         <form onSubmit={handleSubmit} style={styles.form}>
// //           <input
// //             placeholder="Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             style={styles.input}
// //           />
// //           <input
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             style={styles.input}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             style={styles.input}
// //           />
// //           <button type="submit" style={styles.button}>
// //             Create Account
// //           </button>
// //         </form>
// //         <p style={{ marginTop: "15px", textAlign: "center" }}>
// //           Already have an account? <Link to="/login" style={styles.link}>Login</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   page: {
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     height: "100vh",
// //     background: "linear-gradient(to right, #74ebd5, #ACB6E5)"
// //   },
// //   formContainer: {
// //     background: "#fff",
// //     padding: "30px",
// //     borderRadius: "12px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
// //     width: "300px",
// //     textAlign: "center"
// //   },
// //   form: { display: "flex", flexDirection: "column", gap: "12px" },
// //   input: { padding: "10px", borderRadius: "8px", border: "1px solid #ccc", outline: "none" },
// //   button: {
// //     padding: "10px",
// //     backgroundColor: "#2ecc71",
// //     color: "white",
// //     fontWeight: "bold",
// //     border: "none",
// //     borderRadius: "8px",
// //     cursor: "pointer"
// //   },
// //   link: { color: "#2980b9", fontWeight: "bold", textDecoration: "none" },
// // };
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password, role });
//       Swal.fire({
//         icon: 'success',
//         title: 'Signup Successful',
//         text: 'You can login now!',
//         confirmButtonColor: '#2ecc71',
//       }).then(() => navigate("/login"));
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Signup Failed',
//         text: err.response?.data?.message || "Something went wrong!",
//         confirmButtonColor: '#e74c3c',
//       });
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.formContainer}>
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={styles.input}/>
//           <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={styles.input}/>
//           <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={styles.input}/>
//           <select value={role} onChange={e=>setRole(e.target.value)} style={styles.input}>
//             <option value="student">Student</option>
//             <option value="admin">Admin</option>
//           </select>
//           <button type="submit" style={styles.button}>Create Account</button>
//         </form>

//         {/* Link for already registered users */}
//         <p style={{ marginTop: 15, textAlign: "center" }}>
//           Already have an account? <Link to="/login" style={{ color: "#2980b9", fontWeight: "bold", textDecoration: "none" }}>Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: { display:"flex", justifyContent:"center", alignItems:"center", height:"100vh", background:"linear-gradient(to right, #74ebd5, #ACB6E5)" },
//   formContainer: { background:"#fff", padding:30, borderRadius:12, boxShadow:"0 4px 12px rgba(0,0,0,0.1)", width:300, textAlign:"center" },
//   form: { display:"flex", flexDirection:"column", gap:12 },
//   input: { padding:10, borderRadius:8, border:"1px solid #ccc", outline:"none" },
//   button: { padding:10, backgroundColor:"#2ecc71", color:"white", fontWeight:"bold", border:"none", borderRadius:8, cursor:"pointer" }
// };
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  // ✅ Signup function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        name,
        email,
        password,
        role,
      });

      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "You can login now!",
        confirmButtonColor: "#2ecc71",
      }).then(() => navigate("/login"));
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  // ✅ IMPORTANT: When user clicks Login ⇒ force Login page
  const goToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div style={styles.page}>
      <div style={styles.formContainer}>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        {/* ✅ FIXED LOGIN BUTTON */}
        <p style={{ marginTop: 15, textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={goToLogin}
            style={{
              color: "#2980b9",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
  },
  formContainer: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: 300,
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    padding: 10,
    backgroundColor: "#2ecc71",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
