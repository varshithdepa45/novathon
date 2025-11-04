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
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CERT_URL,
  }),
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
      to: ["solarconnect45@gmail.com", "solarconnect18@gmail.com"],
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
