import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// Dummy data generator
const languages = ["Python", "JavaScript", "Java", "C++", "Go", "Rust"];
const cities = ["Patna", "Kolkata", "delhi", "Tokyo", "Mumbai", "chennai"];
const names = ["raju", "bheem", "motu", "john wick", "mia", "kalyani", "Raja", "raj", "bhai", "ballu"];

function generateDummyEmployees() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: names[Math.floor(Math.random() * names.length)],
      salary: Math.floor(Math.random() * 9000000) + 1000000, // between 1m - 10m
      language: languages[Math.floor(Math.random() * languages.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      isManager: Math.random() < 0.5,
    });
  }
  return data;
}

// Route to fetch all employees with optional pagination
router.get("/employees", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const employees = await Employee.find({}).limit(limit).skip(skip);
    res.json(employees);
  } catch (err) {
    console.error("❌ Error fetching employees:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Route to clear & insert fresh data
router.post("/generate", async (req, res) => {
  try {
    await Employee.deleteMany({});
    const newEmployees = generateDummyEmployees();
    const saved = await Employee.insertMany(newEmployees);
    console.log("✅ Inserted Employees:", saved); // debug log
    res.json({ message: "Dummy data generated successfully!", employees: saved });
  } catch (err) {
    console.error("❌ Error generating dummy data:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: err.errors });
    }
    res.status(500).json({ error: "Failed to generate dummy data" });
  }
});

export default router;
