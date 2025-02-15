const express = require("express");
const app = express();
const courseRouter = express.Router();
app.use(express.json());

courseRouter.post("/purchase", function(req, res){
    res.json({
        message : "course purchase end point"
    });
});

courseRouter.get("/preview", function(req, res){
    res.json({
        message : "courses endpoint"
    });
});

module.exports = courseRouter;