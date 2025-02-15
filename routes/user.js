const express = require("express");
const userRouter = express.Router(); 

userRouter.post('/signup', function(req , res){
    res.json({
        message : "signup endpoint"
    });
});

userRouter.post("/signin", function(req, res){
    res.json({
        message : "signin endpoint"
    });
});

module.exports = userRouter;