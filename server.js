import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Wish from "./models/Wish.js";
import Survey from "./models/Survey.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// ===== API =====

// 1️⃣ Lấy danh sách lời chúc
app.get("/api/wishes", async (req, res) => {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.json(wishes);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách lời chúc" });
  }
});

// 2️⃣ Tạo lời chúc mới
app.post("/api/wishes", async (req, res) => {
  try {
    const wish = new Wish(req.body);
    await wish.save();
    res.status(201).json(wish);
  } catch (error) {
    res.status(400).json({ error: "Không thể tạo lời chúc mới" });
  }
});

// 3️⃣ Lấy danh sách khảo sát
app.get("/api/survey", async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });
    res.json(surveys);
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách khảo sát" });
  }
});

// 4️⃣ Tạo khảo sát tham gia
app.post("/api/survey", async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json(survey);
  } catch (error) {
    res.status(400).json({ error: "Không thể tạo khảo sát" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
