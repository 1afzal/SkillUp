const express = require("express");
const courseRouter = express.Router();
const {courseModel} = require("../db");

courseRouter.post("/purchase", function(req, res){
    res.json({
        message : "Course purchase endpoint"
    });
});

courseRouter.get("/preview", function(req, res){
    res.json({
        message : "Courses endpoint"
    });
});

module.exports = courseRouter;
