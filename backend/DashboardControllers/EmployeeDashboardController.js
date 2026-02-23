const Visitors = require("../models/VisitorModel");
const Appointments = require("../models/AppointmentModel");
const Pass = require("../models/PassModel");
const CheckLogs = require("../models/CheckInOutModel");

exports.getEmployeeStatistics = async (req, res) => {

    try{
        const emp_id = req.user._id;

        const total_emp_app = await Appointments.countDocuments({
            EmployeeId: emp_id
        });

        const approve_emp_app = await Appointments.countDocuments({
            EmployeeId: emp_id,
            Status: "approve"
        });

        const pending_emp_app = await Appointments.countDocuments({
            EmployeeId: emp_id,
            Status: "pending"
        });

        const rejected_emp_app = await Appointments.countDocuments({
            EmployeeId: emp_id,
            Status: "rejected"
        });

        res.status(200).json({msg: "Employee Statistics", total_emp_app,approve_emp_app,pending_emp_app,rejected_emp_app});
    }catch(err){
        return res.status(400).json({error: err.message});
    }

}