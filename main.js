require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("DATABASE_URL is missing in environment variables.");
    process.exit(1);
}

async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB connected successfully");

        app.listen(process.env.PORT, function () {
            console.log(`Server listening at port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
}

main();
