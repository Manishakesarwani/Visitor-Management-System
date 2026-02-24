const express=require("express");
const { loginUser, signupUser, addVisitor } = require("../Controllers/UserController");
const UserRoute = express.Router();
const uploadPhoto = require("../middleware/UploadPhoto");

UserRoute.post("/login", loginUser);

UserRoute.post("/signup", signupUser);

UserRoute.post("/visitors", uploadPhoto.single("Photo"), addVisitor);

module.exports=UserRoute