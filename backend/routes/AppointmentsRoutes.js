const express = require("express");
const { getAllAppointments, createNewAppointment, updateAppointmentStatus, getEmployeeAppointments, getFilteredAppointments, exportReqAppointments, exportReqAppAppointments, exportReqRejAppointments } = require("../Controllers/AppointmentController");
const AppointmentRoute = express.Router();
const {RequireAuth, authRole} = require("../middleware/RequireAuth");

AppointmentRoute.use(RequireAuth);

/**
 * Method: GET
 * Path: /api/appointments
 * Description: Get all the apointments in the portal.
 */

AppointmentRoute.get("/", authRole(["admin", "security"]), getAllAppointments);

/**
 * Method: GET
 * Path: /api/appointments/employee
 * Description: Get all the apointments of the specific employee.
 */

AppointmentRoute.get("/employee", authRole(["admin", "employee"]), getEmployeeAppointments);

/**
 * Method: GET
 * Path: /api/appointments/filter
 * Description: Get filtered appointments.
 */

AppointmentRoute.get("/filter", authRole(["admin", "employee", "security"]), getFilteredAppointments);

/**
 * Method: GET
 * Path: /api/appointments/export
 * Description: export all appointments.
 */

AppointmentRoute.get("/export", authRole(["admin"]), exportReqAppointments);

/**
 * Method: GET
 * Path: /api/appointments/approve/export
 * Description: Export approved appointments.
 */

AppointmentRoute.get("/approve/export", authRole(["admin"]), exportReqAppAppointments);

/**
 * Method: GET
 * Path: /api/appointments/rejected/export
 * Description: Export Rejected appointments.
 */

AppointmentRoute.get("/rejected/export", authRole(["admin"]), exportReqRejAppointments);

/**
 * Method: POST
 * Path: /api/appointments
 * Description: Create a new apointment in the portal.
 */

AppointmentRoute.post("/", authRole(["employee"]), createNewAppointment);

/**
 * Method: PATCH
 * Path: /api/appointments/:id
 * Description: Update the status of apointments in the portal.
 */

AppointmentRoute.patch("/:id", authRole(["admin", "employee"]), updateAppointmentStatus);

module.exports= AppointmentRoute;