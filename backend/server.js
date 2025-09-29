// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.log(err));

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });
// const User = mongoose.model("User", userSchema);

// // Signup
// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ message: "User already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ name, email, password: hashedPassword });
//   await newUser.save();
//   res.json({ message: "Signup successful ✅" });
// });

// // Login
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//   res.json({ message: "Login successful ✅", token });
// });

// // Middleware to protect routes
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token expired or invalid" });
//   }
// };

// // Protected dashboard route
// app.get("/dashboard", auth, (req, res) => {
//   res.json({ message: "Welcome to the Dashboard!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "admin"], default: "student" }
});

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
      
       activeBacklogs: { type: String, enum: ["Yes", "No"], default: "No" } // ✅ changed
}

    
  }
});


const User = mongoose.model("User", userSchema);
const Profile = mongoose.model("Profile", profileSchema);

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  if(!name || !email || !password) return res.status(400).json({ message: "All fields required" });
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.json({ message: "Signup successful ✅" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful ✅", token, role: user.role });
});

// Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token expired or invalid" });
  }
};

// Create profile (student)
app.post("/profile", auth, async (req, res) => {
  if(req.role !== "student") return res.status(403).json({ message: "Only students can create profile" });
  const existing = await Profile.findOne({ userId: req.userId });
  if(existing) return res.status(400).json({ message: "Profile already exists" });
  const profile = new Profile({ userId: req.userId, ...req.body });
  await profile.save();
  res.json({ message: "Profile created" });
});

// View profile (student)
app.get("/profile", auth, async (req, res) => {
  if(req.role !== "student") return res.status(403).json({ message: "Only students can view profile" });
  const profile = await Profile.findOne({ userId: req.userId });
  if(!profile) return res.status(404).json({ message: "Profile not found" });
  res.json(profile);
});

// View all students (admin)
// View all students (admin) – updated
app.get("/admin/students", auth, async (req, res) => {
  if (req.role !== "admin") 
    return res.status(403).json({ message: "Only admin can view all students" });

  try {
    // Profile data fetch with user name & email
    const students = await Profile.find()
      .populate("userId", "name email")
      .exec();

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
