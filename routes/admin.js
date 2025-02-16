const express = require("express");
const app = express();
const adminRouter = express.Router();
const { adminModel, userModel } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
app.use(express.json());
const JWT_ADMIN_PASSWORD = "123123";

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
adminRouter.post("/signin", async function (req, res) {

    const {email , password} = req.body;
    try{

    const user = await userModel.findOne({email});

    if(!user){
        res.status(500).json({
            message : "Invalid Mail"
        });
    }
    const passCheck = await bcrypt.compare(password , user.password);

    if(!passCheck){
        res.status(500).json({
            message : "Invalid Password"
        });
    }

    const token = JWT.sign({id : user._id},JWT_ADMIN_PASSWORD);
    return res.json({token});
}
catch(err){
    return res.status(500).json({ message: "Internal server error" });
}
});

// // Course-related Routes
// adminRouter.post("/course", function (req, res) {
//     res.json({ message: "course endpoint" });
// });

// adminRouter.put("/course", function (req, res) {
//     res.json({ message: "course endpoint" });
// });

// adminRouter.get("/course/preview", function (req, res) {
//     res.json({ message: "course preview endpoint" });
// });

module.exports = adminRouter;
