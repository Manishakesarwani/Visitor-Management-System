const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const path=require("path");
const User = require("./routes/User");
const Visitor = require("./routes/VisitorRoutes");
const Appointment = require("./routes/AppointmentsRoutes");
const Pass = require("./routes/PassRoutes");
const CheckInOut = require("./routes/CheckInOut");
const adminDashboard = require("./routes/AdminDashboardRoute");
const employeeDashboard = require("./routes/EmployeeDashboardRoute");
const securityDashboard = require("./routes/SecurityDashboardRoute");


const app = express();


//Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next)=>{
    console.log("Method: ",req.method);
    console.log("Path: ",req.path);
    next();
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    return res.status(200).json({"message": "Home Page"});
});
app.use("/VisitorPasses", express.static(path.join(__dirname, "VisitorPasses")));
app.use("/api/user", User);
app.use("/api/visitors", Visitor);
app.use("/uploads", express.static("uploads"));
app.use("/api/appointments", Appointment);
app.use("/api/pass", Pass);
app.use("/api/checkpass", CheckInOut);
app.use("/api/admin/dashboard", adminDashboard);
app.use("/api/employee/dashboard", employeeDashboard);
app.use("/api/security/dashboard", securityDashboard);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
app.listen(PORT, ()=>{
    console.log(`Database connected, server is up and listening on PORT http://localhost:${PORT}`);
});
})
.catch((err)=>{
    console.log(err);
})