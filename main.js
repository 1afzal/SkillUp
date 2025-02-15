const express = require("express");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const adminRouter = require("./routes/admin");

const app = express();

// Middleware for parsing JSON
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1.admin", adminRouter);

const PORT = 8000;
app.listen(PORT, function () {
    console.log("Server listening at port " + PORT);
});
