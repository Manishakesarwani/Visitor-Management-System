const express = require("express");
const { getAllPass, createNewPass, exportReqPasses } = require("../Controllers/PassControllers");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");

const PassRoute = express.Router();

PassRoute.use(RequireAuth);

/**
 * Method - GET
 * Path - /api/pass
 * Description - Get the passes from the visitors.
 */
PassRoute.get("/", authRole(["admin", "security"]), getAllPass);

/**
 * Method - GET
 * Path - /api/pass/export
 * Description - Get the passes from the visitors.
 */
PassRoute.get("/export", authRole(["admin"]), exportReqPasses);

/**
 * Method - POST
 * Path - /api/pass
 * Description - Create pass for visitors.
 */
PassRoute.post("/", authRole(["admin", "security"]), createNewPass);

module.exports=PassRoute;