// server.js
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // at top


dotenv.config();

// Setup
const url = process.env.MONGO_URI;
if (!url) {
  console.error("MONGO_URI missing in environment variables");
  process.exit(1);
}
const client = new MongoClient(url, { useUnifiedTopology: true });

const app = express();
const port = process.env.PORT || 5000;
const dbName = process.env.DB_NAME || "test";

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Connect to Mongo and start server
(async function start() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }
})();

// Helper to get collection
function passwordsCollection() {
  return client.db(dbName).collection('passwords');
}

// GET all passwords
app.get('/', async (req, res) => {
  try {
    const collection = passwordsCollection();
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch passwords" });
  }
});

// POST create new password
app.post('/', async (req, res) => {
  try {
    const password = { ...req.body };
    delete password._id;
    if (!password.id) {
      password.id = uuidv4();
    }
    const collection = passwordsCollection();
    const existing = await collection.findOne({ id: password.id });
    if (existing) {
      return res.status(409).json({ error: "Item with this id already exists" });
    }
    const insertResult = await collection.insertOne(password);
    res.status(201).json({ success: true, result: insertResult, id: password.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save password" });
  }
});

// PUT update (or upsert) password by id
app.put('/', async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.id) {
      return res.status(400).json({ error: "ID is required for update" });
    }
    delete payload._id;
    const collection = passwordsCollection();
    const updateResult = await collection.updateOne(
      { id: payload.id },
      { $set: payload },
      { upsert: true } // creates it if not present
    );
    res.json({ success: true, result: updateResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password" });
  }
});

// DELETE by id
app.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const collection = passwordsCollection();
    const findResult = await collection.deleteOne({ id: id });
    if (findResult.deletedCount === 0) {
      return res.status(404).json({ error: 'Password not found' });
    }
    res.json({ success: true, result: findResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete password" });
  }
});