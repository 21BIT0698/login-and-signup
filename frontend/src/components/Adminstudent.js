import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// ------------------------ DATE FORMAT ------------------------
function formatDOB(dob) {
  if (!dob) return "";
  const date = new Date(dob);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`; // 1-2-2003
}

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  // ================= FETCH STUDENTS =================
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/students`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudents(res.data);
      } catch (err) {
        Swal.fire("Error!", "Error fetching students", "error");
      }
    };
    fetchStudents();
  }, []);

  // ================= DELETE STUDENT =================
  const deleteStudent = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(students.filter((s) => s._id !== id));
      Swal.fire("Deleted!", "Student removed successfully.", "success");
    } catch (err) {
      Swal.fire("Failed!", "Unable to delete student.", "error");
    }
  };

  // ================= UPDATE STUDENT =================
  const updateStudent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/students/${editData._id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Updated!", "Student details updated successfully!", "success");
      setStudents(students.map((s) => (s._id === editData._id ? editData : s)));
      setEditData(null);
    } catch (err) {
      Swal.fire("Update Failed!", "Could not update student.", "error");
    }
  };

  if (!students.length)
    return <p style={{ textAlign: "center", marginTop: 50 }}>Loading students...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20, color: "#27ae60", textDecoration: "underline" }}>All Students</h2>

      {/* ---------------- EDIT FORM POPUP ---------------- */}
      {editData && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center",
          alignItems: "center", zIndex: 1
        }}>
          <form
            style={{
              background: "#fff", padding: 20, width: 400,
              display: "flex", flexDirection: "column", gap: 10,
              maxHeight: "90vh", overflowY: "auto"
            }}
            onSubmit={updateStudent}
          >
            <h2 style={{ textAlign: "center" }}>Edit Student Details</h2>

            {/* PERSONAL */}
            <h3>Personal Details</h3>
            <input
              value={editData.personal?.name || ""}
              onChange={(e) => setEditData({ ...editData, personal: { ...editData.personal, name: e.target.value } })}
              placeholder="Name"
            />
            <input
              value={editData.personal?.email || ""}
              onChange={(e) => setEditData({ ...editData, personal: { ...editData.personal, email: e.target.value } })}
              placeholder="Email"
            />
            <input
              value={editData.personal?.phone || ""}
              onChange={(e) => setEditData({ ...editData, personal: { ...editData.personal, phone: e.target.value } })}
              placeholder="Phone"
            />
            <input
              value={editData.personal?.gender || ""}
              onChange={(e) => setEditData({ ...editData, personal: { ...editData.personal, gender: e.target.value } })}
              placeholder="Gender"
            />
            <input
              value={editData.personal?.dateOfBirth || ""}
              onChange={(e) => setEditData({ ...editData, personal: { ...editData.personal, dateOfBirth: e.target.value } })}
              placeholder="DOB"
            />

            {/* ADDRESS */}
            <h3>Address Details</h3>
            <input
              value={editData.address?.country || ""}
              onChange={(e) => setEditData({ ...editData, address: { ...editData.address, country: e.target.value } })}
              placeholder="Country"
            />
            <input
              value={editData.address?.state || ""}
              onChange={(e) => setEditData({ ...editData, address: { ...editData.address, state: e.target.value } })}
              placeholder="State"
            />
            <input
              value={editData.address?.district || ""}
              onChange={(e) => setEditData({ ...editData, address: { ...editData.address, district: e.target.value } })}
              placeholder="District"
            />
            <input
              value={editData.address?.line || ""}
              onChange={(e) => setEditData({ ...editData, address: { ...editData.address, line: e.target.value } })}
              placeholder="Address Line"
            />

            {/* 10th */}
            <h3>10th Details</h3>
            <input
              value={editData.education?.tenth?.school || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, tenth: { ...editData.education?.tenth, school: e.target.value } }
              })}
              placeholder="10th School"
            />
            <input
              value={editData.education?.tenth?.percentage || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, tenth: { ...editData.education?.tenth, percentage: e.target.value } }
              })}
              placeholder="10th Percentage"
            />
            <input
              value={editData.education?.tenth?.place || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, tenth: { ...editData.education?.tenth, place: e.target.value } }
              })}
              placeholder="10th Place"
            />

            {/* 12th */}
            <h3>12th Details</h3>
            <input
              value={editData.education?.twelfth?.school || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, twelfth: { ...editData.education?.twelfth, school: e.target.value } }
              })}
              placeholder="12th School"
            />
            <input
              value={editData.education?.twelfth?.percentage || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, twelfth: { ...editData.education?.twelfth, percentage: e.target.value } }
              })}
              placeholder="12th Percentage"
            />
            <input
              value={editData.education?.twelfth?.place || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, twelfth: { ...editData.education?.twelfth, place: e.target.value } }
              })}
              placeholder="12th Place"
            />

            {/* UG */}
            <h3>UG Details</h3>
            <input
              value={editData.education?.ug?.university || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, university: e.target.value } }
              })}
              placeholder="UG University"
            />
            <input
              value={editData.education?.ug?.college || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, college: e.target.value } }
              })}
              placeholder="UG College"
            />
            <input
              value={editData.education?.ug?.department || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, department: e.target.value } }
              })}
              placeholder="UG Department"
            />
            <input
              value={editData.education?.ug?.cgpa || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, cgpa: e.target.value } }
              })}
              placeholder="UG CGPA"
            />
            <input
              value={editData.education?.ug?.graduationYear || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, graduationYear: e.target.value } }
              })}
              placeholder="UG Graduation Year"
            />
            <input
              value={editData.education?.ug?.place || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, place: e.target.value } }
              })}
              placeholder="UG Place"
            />
            <input
              value={editData.education?.ug?.activeBacklogs || ""}
              onChange={(e) => setEditData({
                ...editData,
                education: { ...editData.education, ug: { ...editData.education?.ug, activeBacklogs: e.target.value } }
              })}
              placeholder="Active Backlogs"
            />

            <button type="submit" style={{ background: "green", color: "#fff", padding: 10, border: "none" }}>Save</button>
            <button type="button" style={{ background: "gray", color: "#fff", padding: 10, border: "none" }} onClick={() => setEditData(null)}>Cancel</button>
          </form>
        </div>
      )}

      {/* ---------------- TABLE ---------------- */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
              <th style={styles.th}>10th School</th>
              <th style={styles.th}>10th %</th>
              <th style={styles.th}>10th Place</th>
              <th style={styles.th}>12th School</th>
              <th style={styles.th}>12th %</th>
              <th style={styles.th}>12th Place</th>
              <th style={styles.th}>UG University</th>
              <th style={styles.th}>UG College</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>CGPA</th>
              <th style={styles.th}>Grad Year</th>
              <th style={styles.th}>Place</th>
              <th style={styles.th}>Backlogs</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "#ffffff" }}>
                <td style={styles.td}>{student.personal?.name}</td>
                <td style={styles.td}>{student.personal?.email}</td>
                <td style={styles.td}>{student.personal?.phone}</td>
                <td style={styles.td}>{student.personal?.gender}</td>
                <td style={styles.td}>{formatDOB(student.personal?.dateOfBirth)}</td><td style={styles.td}>{formatDOB(student.personal?.dateOfBirth)}</td>
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
                <td style={styles.td}>{student.education?.ug?.activeBacklogs}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={{ background: "blue", color: "#fff", padding: "5px 10px", border: "none" }}
                      onClick={() => setEditData(JSON.parse(JSON.stringify(student)))}
                    >Edit</button>
                    <button style={{ background: "red", color: "#fff", padding: "5px 10px", border: "none" }}
                      onClick={() => deleteStudent(student._id)}
                    >Delete</button>
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
  th: { padding: 15, background: "#2c3e50", color: "#fff", border: "1px solid #ddd" },
  td: { padding: 10, border: "1px solid #ddd" },
};
