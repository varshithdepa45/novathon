// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

dotenv.config(); // Load environment variables

const app = express();

// ==========================
// 🔧 Middleware
// ==========================
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // allow frontend (Vite)
  credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// ==========================
// 🧩 MongoDB Connection
// ==========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails
  });

// ==========================
// 📦 Mongoose Schema & Model
// ==========================
const assessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  peakConsumption: { type: Number },
  lowestConsumption: { type: Number },
  monthlyConsumption: { type: Number },
  monthlyBill: { type: Number },
  terraceArea: { type: Number },
  gridKnowledge: { type: String },
  submittedAt: { type: Date, default: Date.now },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

// ==========================
// 📧 Nodemailer Configuration
// ==========================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verify transporter setup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("📨 Email service ready to send messages.");
  }
});

// ==========================
// 🚀 Routes
// ==========================

// Test Route
app.get("/", (req, res) => {
  res.send("☀️ SolarBridge Backend is running and connected to MongoDB!");
});

// Fetch all assessments
app.get("/api/assessments", async (req, res) => {
  try {
    const forms = await Assessment.find().sort({ submittedAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

// Submit assessment
app.post("/api/submit-assessment", async (req, res) => {
  try {
    const form = new Assessment(req.body);
    await form.save();

    console.log("✅ New form submission:", form);

    // Email content
    const mailOptions = {
      from: `"SolarBridge" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `🌞 New Solar Assessment from ${form.name}`,
      html: `
        <h2>New Solar Assessment</h2>
        <p><strong>Name:</strong> ${form.name}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Contact:</strong> ${form.contact}</p>
        <p><strong>Address:</strong> ${form.address}, ${form.city}, ${form.pincode}</p>
        <p><strong>Monthly Bill:</strong> ₹${form.monthlyBill}</p>
        <p><strong>Terrace Area:</strong> ${form.terraceArea} sq.ft</p>
        <p><strong>Grid Knowledge:</strong> ${form.gridKnowledge}</p>
        <p><strong>Submitted At:</strong> ${form.submittedAt}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("📧 Email notification sent successfully!");

    res.status(201).json({ message: "Form submitted and email sent successfully" });
  } catch (error) {
    console.error("❌ Error during form submission:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

// ==========================
// 🖥️ Server Start
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
