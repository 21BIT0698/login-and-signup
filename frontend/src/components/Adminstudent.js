import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  // ---------------------------------------------------------
  // Fetch Students
  // ---------------------------------------------------------
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  // ---------------------------------------------------------
  // Prepare Data For Edit (Fix undefined errors)
  // ---------------------------------------------------------
  const openEdit = (stu) => {
    setEditData({
      ...stu,
      personal: {
        name: stu.personal?.name || "",
        email: stu.personal?.email || "",
        phone: stu.personal?.phone || "",
        gender: stu.personal?.gender || "",
        dateOfBirth: stu.personal?.dateOfBirth || "",
      },

      address: {
        country: stu.address?.country || "",
        state: stu.address?.state || "",
        district: stu.address?.district || "",
        line: stu.address?.line || "",
      },

      education: {
        tenth: {
          school: stu.education?.tenth?.school || "",
          place: stu.education?.tenth?.place || "",
          percentage: stu.education?.tenth?.percentage || "",
        },
        twelfth: {
          school: stu.education?.twelfth?.school || "",
          place: stu.education?.twelfth?.place || "",
          percentage: stu.education?.twelfth?.percentage || "",
        },
        ug: {
          university: stu.education?.ug?.university || "",
          college: stu.education?.ug?.college || "",
          department: stu.education?.ug?.department || "",
          cgpa: stu.education?.ug?.cgpa || "",
          graduationYear: stu.education?.ug?.graduationYear || "",
          place: stu.education?.ug?.place || "",
          activeBacklogs: stu.education?.ug?.activeBacklogs || "No",
        },
      },
    });
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure to delete this student?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(students.filter((s) => s._id !== id));
      alert("Student deleted successfully!");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // ---------------------------------------------------------
  // UPDATE SUBMIT
  // ---------------------------------------------------------
  const updateStudent = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/students/${editData._id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Updated successfully!");

      // Update UI list
      setStudents(students.map((s) => (s._id === editData._id ? editData : s)));

      setEditData(null);
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!students.length)
    return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "green" }}>All Students</h2>

      {/* EDIT POPUP */}
      {editData && (
        <div style={popupStyle}>
          <form onSubmit={updateStudent} style={formStyle}>
            <h3>Edit Student Details</h3>

            {/* PERSONAL */}
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

            {/* ADDRESS */}
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

            {/* EDUCATION → UG */}
            <input
              value={editData.education.ug.college}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  education: {
                    ...editData.education,
                    ug: { ...editData.education.ug, college: e.target.value },
                  },
                })
              }
              placeholder="UG College"
            />

            <input
              value={editData.education.ug.department}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  education: {
                    ...editData.education,
                    ug: { ...editData.education.ug, department: e.target.value },
                  },
                })
              }
              placeholder="Department"
            />

            <button type="submit" style={btnStyle}>
              Save
            </button>
            <button type="button" style={btnStyle} onClick={() => setEditData(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>Country</th>
            <th>UG College</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu) => (
            <tr key={stu._id}>
              <td>{stu.personal?.name}</td>
              <td>{stu.personal?.email}</td>
              <td>{stu.personal?.phone}</td>
              <td>{stu.personal?.dateOfBirth}</td>
              <td>{stu.address?.country}</td>
              <td>{stu.education?.ug?.college}</td>

              <td>
                <button onClick={() => openEdit(stu)} style={actionBtn}>
                  Edit
                </button>

                <button onClick={() => deleteStudent(stu._id)} style={deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------
// Styles
// ---------------------------------------------------------
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 20,
};

const actionBtn = {
  padding: "5px 10px",
  background: "blue",
  color: "#fff",
  marginRight: 5,
};

const deleteBtn = {
  padding: "5px 10px",
  background: "red",
  color: "#fff",
};

const popupStyle = {
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

const formStyle = {
  background: "#fff",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "350px",
};

const btnStyle = {
  padding: 10,
  background: "green",
  color: "#fff",
};
