const express = require("express");
const { getAllVisitor, addVisitor, removeVisitor, getSearchedVisitor, exportReqVisitors } = require("../Controllers/VisitorController");
const {RequireAuth, authRole} = require("../middleware/RequireAuth");
const uploadPhoto = require("../middleware/UploadPhoto");

const VisitorRoutes = express.Router();

//Authenticate User

VisitorRoutes.use(RequireAuth);

/**
 * Method: GET
 * Path: api/visitor
 * Description: Get all the visitors
 */

VisitorRoutes.get("/", authRole(["admin", "security", "employee"]), getAllVisitor);

/**
 * Method: GET
 * Path: api/visitor/search
 * Description: Get searched visitors
 */

VisitorRoutes.get("/search", authRole(["admin", "security", "employee"]), getSearchedVisitor);

/**
 * Method: POST
 * Path: api/visitor
 * Description: Add a new visitor
 */

VisitorRoutes.post("/", authRole(["admin", "security"]), uploadPhoto.single("Photo"), addVisitor);

/**
 * Method: DELETE
 * Path: api/visitor/remove/:id
 * Description: Delete Visitor
 */

VisitorRoutes.delete("/remove/:id", authRole(["admin"]), removeVisitor);

/**
 * Method: GET
 * Path: api/visitor/export
 * Description: Export all the selected Visitors
 */

VisitorRoutes.get("/export", authRole(["admin"]), exportReqVisitors);

module.exports = VisitorRoutes;