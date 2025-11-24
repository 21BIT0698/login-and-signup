import React, { useEffect, useState } from "react"; 
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // ---------------- Fetch Student List ----------------
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ---------------- Delete Student ----------------
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/student/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Student deleted successfully");
      fetchStudents();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ---------------- Open Edit Modal ----------------
  const openEditModal = (student) => {
    setEditData(JSON.parse(JSON.stringify(student))); // deep copy
    setModalOpen(true);
  };

  // ---------------- Save Updated Data ----------------
  const saveUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/student/${editData._id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Student updated successfully");
      setModalOpen(false);
      fetchStudents();
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!students.length)
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        Loading students...
      </p>
    );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Students</h2>
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
              <th style={styles.th}>Address Line</th>
              <th style={styles.th}>10th School</th>
              <th style={styles.th}>10th %</th>
              <th style={styles.th}>12th School</th>
              <th style={styles.th}>12th %</th>
              <th style={styles.th}>UG College</th>
              <th style={styles.th}>UG CGPA</th>
              <th style={styles.th}>Update</th>
              <th style={styles.th}>Delete</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td style={styles.td}>{student.personal?.name}</td>
                <td style={styles.td}>{student.personal?.email}</td>
                <td style={styles.td}>{student.personal?.phone}</td>
                <td style={styles.td}>{student.personal?.gender}</td>
                <td style={styles.td}>{student.personal?.dateOfBirth}</td>
                <td style={styles.td}>{student.address?.country}</td>
                <td style={styles.td}>{student.address?.state}</td>
                <td style={styles.td}>{student.address?.district}</td>
                <td style={styles.td}>{student.address?.line}</td>
                <td style={styles.td}>{student.education?.tenth?.school}</td>
                <td style={styles.td}>{student.education?.tenth?.percentage}</td>
                <td style={styles.td}>{student.education?.twelfth?.school}</td>
                <td style={styles.td}>{student.education?.twelfth?.percentage}</td>
                <td style={styles.td}>{student.education?.ug?.college}</td>
                <td style={styles.td}>{student.education?.ug?.cgpa}</td>

                {/* UPDATE BUTTON */}
                <td style={styles.td}>
                  <button style={styles.updateBtn} onClick={() => openEditModal(student)}>
                    Update
                  </button>
                </td>

                {/* DELETE BUTTON */}
                <td style={styles.td}>
                  <button style={styles.deleteBtn} onClick={() => deleteStudent(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {modalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Edit Student</h3>

            <input
              style={styles.input}
              type="text"
              value={editData.personal.name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, name: e.target.value },
                })
              }
            />

            <input
              style={styles.input}
              type="text"
              value={editData.personal.email}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: { ...editData.personal, email: e.target.value },
                })
              }
            />

            <button style={styles.saveBtn} onClick={saveUpdate}>
              Save
            </button>

            <button style={styles.closeBtn} onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------- STYLES -------------------
const styles = {
  container: { padding: 20, display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { marginBottom: 20, color: "#27ae60", textDecoration: "underline" },
  table: { borderCollapse: "collapse", width: "100%", minWidth: 1400 },
  th: { padding: 10, backgroundColor: "#2c3e50", color: "#fff", border: "1px solid #000" },
  td: { padding: 10, border: "1px solid #000" },

  updateBtn: {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },

  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },

  modal: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: 300,
    borderRadius: 10,
    textAlign: "center",
  },

  input: {
    width: "90%",
    margin: "8px 0",
    padding: 8,
  },

  saveBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "8px 12px",
    width: "100%",
    marginTop: 10,
  },

  closeBtn: {
    backgroundColor: "gray",
    color: "white",
    padding: "8px 12px",
    width: "100%",
    marginTop: 10,
  },
};
