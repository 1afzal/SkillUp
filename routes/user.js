const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWT_USER_PASSWORD = "abc123";

userRouter.post('/signup', async function (req, res) {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 5);
        await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPass
        });

        return res.json({ message: "Signup successful" });

    } catch (err) {
        console.error("Error in inserting to DB:", err);
        return res.status(500).json({ message: "Error in inserting to DB" });
    }
});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body; // here password is plain-text-password.

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Incorrect email" });
        }

        const isMatch = await bcrypt.compare(password, user.password); //comparing plaintext password and hashed pasword stored in user.password
        if (!isMatch) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        const token = JWT.sign({ id: user._id }, JWT_USER_PASSWORD);
        return res.json({ token });

    } catch (error) {
        console.error("Error in signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = userRouter;
