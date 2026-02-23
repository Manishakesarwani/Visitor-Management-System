const express=require("express");
const { loginUser, signupUser } = require("../Controllers/UserController");
const UserRoute = express.Router();

UserRoute.post("/login", loginUser);

UserRoute.post("/signup", signupUser);

module.exports=UserRoute