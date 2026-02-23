const express = require("express");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");
const { getAdminStatistics } = require("../DashboardControllers/AdminDashboard");

const adminDashboardRoute = express.Router();

adminDashboardRoute.use(RequireAuth);

/**
 * Method - GET
 * Path - /api/admin/dashboard
 * Description - Get statistics of all the Visitors, appointments, passes and Checklogs.
 */

adminDashboardRoute.get("/", authRole(["admin"]), getAdminStatistics);

module.exports = adminDashboardRoute;