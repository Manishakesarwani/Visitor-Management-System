const express = require("express");
const { scanPassToUpdateAndCreateEntry, getLogs, exportReqChecklogs } = require("../Controllers/CheckInOutController");
const CheckInOutRoutes = express.Router();
const {RequireAuth, authRole} = require("../middleware/RequireAuth");

CheckInOutRoutes.use(RequireAuth);


/**
 * Method - POST
 * Path - /api/checkpass/:id
 * Description - Create a entry if the visitor logs in and update the entry of already logged in/logging out.
 */

CheckInOutRoutes.post("/:id", authRole(["security"]), scanPassToUpdateAndCreateEntry);

/**
 * Method - GET
 * Path - /api/checkpass/
 * Description - Get all the logs.
 */

CheckInOutRoutes.get("/", authRole(["admin", "security"]), getLogs);

/**
 * Method - GET
 * Path - /api/checkpass/export
 * Description - Get all the logs.
 */

CheckInOutRoutes.get("/export", authRole(["admin"]), exportReqChecklogs);

module.exports = CheckInOutRoutes;