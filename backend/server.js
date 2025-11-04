// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

dotenv.config(); // Load environment variables

const app = express();

// ==========================
// 📂 Directory setup
// ==========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// 🔧 Middleware
// ==========================
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // frontend in dev
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// ==========================
// ✅ Step 2 — Verify ENV Variables are Loaded
// ==========================
console.log("📧 Checking environment variables...");
console.log("   EMAIL_USER:", process.env.EMAIL_USER || "❌ Not Found");
console.log(
  "   EMAIL_PASS:",
  process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"
);

// ==========================
// 🔥 Firebase Admin Initialization
// ==========================
const serviceAccountPath = path.join(
  __dirname,
  "solar-87382-firebase-adminsdk-fbsvc-567cf894a8.json"
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const db = admin.firestore();

// ==========================
// 📧 Nodemailer Configuration
// ==========================
console.log("📨 Initializing email transporter...");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASS?.trim(),
  },
  authMethod: "LOGIN",
});

// ✅ Verify transporter setup
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("📨 Email service ready to send messages.");
  }
});

// ==========================
// 🚀 API Routes
// ==========================
app.get("/api/assessments", async (req, res) => {
  try {
    const snapshot = await db
      .collection("assessments")
      .orderBy("submittedAt", "desc")
      .get();
    const forms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(forms);
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

app.post("/api/submit-assessment", async (req, res) => {
  try {
    const formData = {
      ...req.body,
      submittedAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("assessments").add(formData);

    const mailOptions = {
      from: `"SolarBridge" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER, // fallback to self
      subject: `🌞 New Solar Assessment from ${formData.name}`,
      html: `
        <h2>New Solar Assessment</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Contact:</strong> ${formData.contact}</p>
        <p><strong>Address:</strong> ${formData.address}, ${formData.city}, ${formData.pincode}</p>
        <p><strong>Monthly Bill:</strong> ₹${formData.monthlyBill}</p>
        <p><strong>Terrace Area:</strong> ${formData.terraceArea} sq.ft</p>
        <p><strong>Grid Knowledge:</strong> ${formData.gridKnowledge}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email notification sent!");
    res
      .status(201)
      .json({ message: "Form submitted successfully", id: docRef.id });
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

// ==========================
// 🌐 Serve Frontend (Production)
// ==========================
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Serve React app for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ==========================
// 🖥️ Start Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
