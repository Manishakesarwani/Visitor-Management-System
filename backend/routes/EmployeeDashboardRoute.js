const express = require("express");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");
const { getEmployeeStatistics } = require("../DashboardControllers/EmployeeDashboardController");

const employeeDashboardRoute = express.Router();

employeeDashboardRoute.use(RequireAuth);

/**
 * Method - GET
 * Path - /api/employee/dashboard
 * Description - Get statistics of all the Visitors, appointments, passes and Checklogs.
 */

employeeDashboardRoute.get("/", authRole(["employee"]), getEmployeeStatistics);

module.exports = employeeDashboardRoute;