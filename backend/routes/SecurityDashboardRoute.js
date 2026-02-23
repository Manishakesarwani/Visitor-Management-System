const express = require("express");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");
const { getSecurityStatistics } = require("../DashboardControllers/SecurityDashboardController");

const securityDashboardRoute = express.Router();

securityDashboardRoute.use(RequireAuth);

/**
 * Method - GET
 * Path - /api/security/dashboard
 * Description - Get statistics of all the Visitors, appointments, passes and Checklogs.
 */

securityDashboardRoute.get("/", authRole(["security"]), getSecurityStatistics);

module.exports = securityDashboardRoute;