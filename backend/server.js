// ===============================
// IMPORTS
// ===============================
const express = require("express");
require("dotenv").config();
const mysql = require("mysql2");
const cors = require("cors");

const app = express();


// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());


// ===============================
// DATABASE CONNECTION
// ===============================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.log("DB Error:", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});


// ===============================
// ROUTES
// ===============================

// Test route
app.get("/", (req, res) => {
    res.send("Server running 🚀");
});


// Save registration
app.post("/register", (req, res) => {
    const { name, email, event } = req.body;

    const sql = "INSERT INTO registrations (name, email, event) VALUES (?, ?, ?)";

    db.query(sql, [name, email, event], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error saving data");
        }
        res.send("Registration saved successfully ✅");
    });
});


// Get latest 6 registrations
app.get("/recent", (req, res) => {
    const sql = `
        SELECT name, event, created_at
        FROM registrations
        ORDER BY created_at DESC
        LIMIT 6
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching data");
        }
        res.json(results);
    });
});


// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});