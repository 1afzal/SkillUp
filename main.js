const express = require("express");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const app = express();
app.use(express.json());
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/course", courseRouter);


const PORT  = 8000;

app.listen(PORT , function(){
    console.log("Server listening at port " + PORT);
})

