const express = require("express");
const userRouter = express.Router(); 
const {userModel} = require("../db");
const bcrypt = require("bcrypt");

userRouter.post('/signup', async function(req , res){
    const { firstName, lastName, email, password } = req.body;
    let hashedPass;

    try {
        hashedPass = await bcrypt.hash(password, 5);
    } catch (error) {
        console.error("Error in hashing:", error);
        return res.status(500).json({ message: "Error in hashing" });  
    }

    try {
        await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPass  
        });

        res.json({ message: "Signup successful" });

    } catch (err) {
        console.error("Error in inserting to DB:", err);
        return res.status(500).json({ message: "Error in inserting to DB" });
    }
});

userRouter.post("/signin", function(req, res){
    res.json({ message: "Signin endpoint" });
});

module.exports = userRouter;
