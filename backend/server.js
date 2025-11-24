const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ------------------ MongoDB ------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "admin"], default: "student" }
});

const User = mongoose.model("User", userSchema);

// ------------------ PROFILE SCHEMA ------------------
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  personal: {
    name: String,
    email: String,
    phone: String,
    gender: String,
    dateOfBirth: String
  },

  address: {
    country: String,
    state: String,
    district: String,
    line: String
  },

  education: {
    tenth: { school: String, place: String, percentage: String },
    twelfth: { school: String, place: String, percentage: String },
    ug: {
      university: String,
      college: String,
      department: String,
      cgpa: String,
      graduationYear: String,
      place: String,
      activeBacklogs: { type: String, enum: ["Yes", "No"], default: "No" }
    }
  }
});

const Profile = mongoose.model("Profile", profileSchema);

// ------------------ Signup ------------------
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();

  res.json({ message: "Signup successful" });
});

// ------------------ Login ------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token, role: user.role });
});

// ------------------ Auth Middleware ------------------
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

// ------------------ Create Profile ------------------
app.post("/profile", auth, async (req, res) => {
  if (req.role !== "student")
    return res.status(403).json({ message: "Only students can create profile" });

  const exists = await Profile.findOne({ userId: req.userId });
  if (exists)
    return res.status(400).json({ message: "Profile already exists" });

  const profile = new Profile({ userId: req.userId, ...req.body });
  await profile.save();

  res.json({ message: "Profile created" });
});

// ------------------ View Student Profile ------------------
app.get("/profile", auth, async (req, res) => {
  if (req.role !== "student")
    return res.status(403).json({ message: "Only students can view profile" });

  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile)
    return res.status(404).json({ message: "Profile not found" });

  res.json(profile);
});


// ===========================================================
//               ADMIN ROUTES (Corrected Fully)
// ===========================================================

// ------------------ Admin: View All Students ------------------
app.get("/admin/students", auth, async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Only admin can view students" });

  const students = await Profile.find().populate("userId", "name email role");
  res.json(students);
});

// ------------------ Admin: Update Student (FULL PROFILE) ------------------
app.put("/admin/students/:id", auth, async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Only admin can update students" });

  try {
    const updated = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Student not found" });

    res.json({
      message: "Student updated successfully!",
      student: updated
    });
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
});

// ------------------ Admin: Delete Student ------------------
app.delete("/admin/students/:id", auth, async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Only admin can delete students" });

  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
});

// ------------------ Server Start ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
