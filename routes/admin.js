const express = require("express");
const adminRouter = express.Router();
const { adminModel } = require("../db");
const bcrypt = require("bcrypt");

// Admin Signup
adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Hash password
        const hashedPass = await bcrypt.hash(password, 10);
        
        // Store admin in DB
        await adminModel.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        });

        return res.json({ message: "Signup successful" });

    } catch (err) {
        console.error(`Error inserting to DB: ${err}`);
        return res.status(500).json({ message: "Error inserting to DB" });
    }
});

// Admin Signin (To be implemented)
adminRouter.post("/signin", function (req, res) {
    res.json({ message: "signin endpoint" });
});

// Course-related Routes
adminRouter.post("/course", function (req, res) {
    res.json({ message: "course endpoint" });
});

adminRouter.put("/course", function (req, res) {
    res.json({ message: "course endpoint" });
});

adminRouter.get("/course/preview", function (req, res) {
    res.json({ message: "course preview endpoint" });
});

module.exports = adminRouter;
