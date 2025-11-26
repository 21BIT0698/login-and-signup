import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/students`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  // ===================== FORMAT DOB =====================
  const formatDOB = (dob) => {
    if (!dob) return "N/A";
    const [year, month, day] = dob.split("-");
    return `${parseInt(day)}-${parseInt(month)}-${year}`;
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/admin/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStudents(students.filter((s) => s._id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // UPDATE STUDENT
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/students/${editData._id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Student updated successfully!");
      setStudents(
        students.map((s) => (s._id === editData._id ? editData : s))
      );
      setEditData(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!students.length)
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading students...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Students</h2>

      {/* ========================= EDIT POPUP ========================= */}
      {editData && (
        <div style={popup}>
          <form style={popupForm} onSubmit={updateStudent}>
            <h2 style={{ textAlign: "center" }}>Edit Student Details</h2>

            {/* PERSONAL */}
            <h3>Personal Details</h3>
            <input
              value={editData.personal.name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, name: e.target.value },
                })
              }
              placeholder="Name"
            />
            <input
              value={editData.personal.email}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, email: e.target.value },
                })
              }
              placeholder="Email"
            />
            <input
              value={editData.personal.phone}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, phone: e.target.value },
                })
              }
              placeholder="Phone"
            />
            <input
              value={editData.personal.gender}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, gender: e.target.value },
                })
              }
              placeholder="Gender"
            />
            <input
              type="date"
              value={editData.personal.dateOfBirth}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, dateOfBirth: e.target.value },
                })
              }
              placeholder="DOB"
            />

            {/* ADDRESS */}
            <h3>Address Details</h3>
            <input
              value={editData.address.country}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: { ...editData.address, country: e.target.value },
                })
              }
              placeholder="Country"
            />
            <input
              value={editData.address.state}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: { ...editData.address, state: e.target.value },
                })
              }
              placeholder="State"
            />
            <input
              value={editData.address.district}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: { ...editData.address, district: e.target.value },
                })
              }
              placeholder="District"
            />
            <input
              value={editData.address.line}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: { ...editData.address, line: e.target.value },
                })
              }
              placeholder="Address Line"
            />

            {/* Other education fields (10th, 12th, UG) remain unchanged */}

            <button type="submit" style={btnSave}>Save</button>
            <button type="button" style={btnCancel} onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* ========================= TABLE ========================= */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>DOB</th>
              <th style={styles.th}>Country</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>District</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                style={{ backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "#ffffff" }}
              >
                <td style={styles.td}>{student.personal?.name}</td>
                <td style={styles.td}>{student.personal?.email}</td>
                <td style={styles.td}>{student.personal?.phone}</td>
                <td style={styles.td}>{student.personal?.gender}</td>
                <td style={styles.td}>{formatDOB(student.personal?.dateOfBirth)}</td>
                <td style={styles.td}>{student.address?.country}</td>
                <td style={styles.td}>{student.address?.state}</td>
                <td style={styles.td}>{student.address?.district}</td>
                <td style={styles.td}>{student.address?.line}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button style={btnEdit} onClick={() => setEditData(student)}>Edit</button>
                    <button style={btnDelete} onClick={() => deleteStudent(student._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  heading: { marginBottom: 20, color: "#27ae60", textDecoration: "underline" },
  table: { borderCollapse: "collapse", width: "100%" },
  th: { padding: 10, background: "#2c3e50", color: "#fff", border: "1px solid #ddd" },
  td: { padding: 10, border: "1px solid #ddd", whiteSpace: "nowrap" },
};

const popup = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const popupForm = {
  background: "#fff",
  padding: 20,
  width: 400,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  maxHeight: "90vh",
  overflowY: "auto",
};

const btnEdit = { background: "blue", color: "#fff", padding: "5px 10px", border: "none" };
const btnDelete = { background: "red", color: "#fff", padding: "5px 10px", border: "none" };
const btnSave = { background: "green", color: "#fff", padding: 10, border: "none" };
const btnCancel = { background: "gray", color: "#fff", padding: 10, border: "none" };
