import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// ===================== DATE FORMAT FUNCTION =====================
const formatDOB = (dob) => {
  if (!dob) return "N/A";
  const parts = dob.split("-");
  return `${parseInt(parts[2])}-${parseInt(parts[1])}-${parts[0]}`;
};

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  // ================== DELETE STUDENT =====================
  const deleteStudent = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Deleted!", "Student removed successfully.", "success");
        setStudents(students.filter((s) => s._id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>

      {/* Centered Heading */}
      <h2
        style={{
          marginBottom: 20,
          color: "#27ae60",
          textDecoration: "underline",
          textAlign: "center",
        }}
      >
        All Students
      </h2>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Gender</th>
            <th style={styles.th}>DOB</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td style={styles.td}>{student.personal?.name}</td>
                <td style={styles.td}>{student.personal?.email}</td>
                <td style={styles.td}>{student.personal?.phone}</td>
                <td style={styles.td}>{student.personal?.gender}</td>
                <td style={styles.td}>{formatDOB(student.personal?.dateOfBirth)}</td>

                {/* center action buttons */}
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                      style={styles.editBtn}
                      onClick={() =>
                        setEditData(JSON.parse(JSON.stringify(student)))
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.td}>
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ===================== STYLES =====================
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  th: {
    padding: 10,
    background: "#2c3e50",
    color: "#fff",
    border: "1px solid #ddd",
    textAlign: "center", // Added
  },
  td: {
    padding: 10,
    border: "1px solid #ddd",
    textAlign: "center", // Added
  },
  editBtn: {
    background: "#3498db",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: 5,
  },
  deleteBtn: {
    background: "#e74c3c",
    border: "none",
    padding: "6px 12px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: 5,
  },
};
