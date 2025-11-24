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
      alert("Deleted Successfully!");
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

      alert("Updated Successfully!");

      setStudents(
        students.map((s) => (s._id === editData._id ? editData : s))
      );

      setEditData(null);
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

      {/* UPDATE POPUP */}
      {editData && (
        <div style={popup}>
          <form style={popupForm} onSubmit={updateStudent}>
            <h3>Edit Student Details</h3>

            <input
              value={editData.personal.name}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: {
                    ...editData.personal,
                    name: e.target.value,
                  },
                })
              }
              placeholder="Name"
            />

            <input
              value={editData.personal.email}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: {
                    ...editData.personal,
                    email: e.target.value,
                  },
                })
              }
              placeholder="Email"
            />

            <input
              value={editData.personal.phone}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  personal: {
                    ...editData.personal,
                    phone: e.target.value,
                  },
                })
              }
              placeholder="Phone"
            />

            <button type="submit" style={btnSave}>Save</button>
            <button type="button" style={btnCancel} onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

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
              <th style={styles.th}>10th Place</th>
              <th style={styles.th}>12th School</th>
              <th style={styles.th}>12th %</th>
              <th style={styles.th}>12th Place</th>
              <th style={styles.th}>UG University</th>
              <th style={styles.th}>UG College</th>
              <th style={styles.th}>UG Department</th>
              <th style={styles.th}>UG CGPA</th>
              <th style={styles.th}>UG Graduation Year</th>
              <th style={styles.th}>UG Place</th>
              <th style={styles.th}>UG Active Backlogs</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#ffffff",
                }}
              >
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
                <td style={styles.td}>{student.education?.tenth?.place}</td>
                <td style={styles.td}>{student.education?.twelfth?.school}</td>
                <td style={styles.td}>{student.education?.twelfth?.percentage}</td>
                <td style={styles.td}>{student.education?.twelfth?.place}</td>
                <td style={styles.td}>{student.education?.ug?.university}</td>
                <td style={styles.td}>{student.education?.ug?.college}</td>
                <td style={styles.td}>{student.education?.ug?.department}</td>
                <td style={styles.td}>{student.education?.ug?.cgpa}</td>
                <td style={styles.td}>{student.education?.ug?.graduationYear}</td>
                <td style={styles.td}>{student.education?.ug?.place}</td>
                <td style={styles.td}>
                  {student.education?.ug?.activeBacklogs}
                </td>

                {/* ACTION BUTTONS */}
                <td style={styles.td}>
                  <button
                    style={btnEdit}
                    onClick={() => setEditData(student)}
                  >
                    Edit
                  </button>

                  <button
                    style={btnDelete}
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
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
  container: { padding: 20, display: "flex", flexDirection: "column", alignItems: "center" },
  heading: { marginBottom: 20, color: "#27ae60", textDecoration: "underline" },
  table: { borderCollapse: "collapse", width: "100%", minWidth: 1400 },
  th: { padding: "10px", background: "#2c3e50", color: "#fff", border: "2px solid black" },
  td: { padding: "10px", border: "2px solid black", fontSize: 14 }
};

// popup styles
const popup = {
  position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
};

const popupForm = {
  background: "#fff", padding: 25, width: 350,
  display: "flex", flexDirection: "column", gap: 12
};

const btnEdit = { background: "blue", color: "#fff", border: "none", padding: "5px 10px", marginRight: 5 };
const btnDelete = { background: "red", color: "#fff", border: "none", padding: "5px 10px" };
const btnSave = { background: "green", color: "#fff", padding: 10, border: "none" };
const btnCancel = { background: "gray", color: "#fff", padding: 10, border: "none" };
