const express=require("express");
const { signupUserViaAdmin, getUsers, exportReqEmployee, exportReqSecurity } = require("../Controllers/UserController");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");
const UserRoute = express.Router();

//Authenticate User

UserRoute.use(RequireAuth);

UserRoute.post("/signup", authRole(["admin"]), signupUserViaAdmin);
UserRoute.get("/get", authRole(["admin"]), getUsers);
UserRoute.get("/employee/export", authRole(["admin"]), exportReqEmployee);
UserRoute.get("/security/export", authRole(["admin"]), exportReqSecurity);

module.exports = UserRoute;