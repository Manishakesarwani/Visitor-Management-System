const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const AppointmentModel = new Schema({
    VisitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
        required: true
    },
    EmployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    Objective: {
        type: String,
        required: true
    },
    When: {
        type: Date,
        required: true
    },
    Status: {
        type: String,
        enum: ["approve", "pending", "rejected"],
        default: "pending",
        required: true
    }
}, {timestamps: true});


module.exports=mongoose.model("Appointment", AppointmentModel);