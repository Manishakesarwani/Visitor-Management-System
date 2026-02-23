const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PassModel = new Schema({
    AppointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    VisitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Visitor",
        required: true
    },
    AcceptableFrom: {
        type: Date,
        required: true
    },
    AcceptableTill: {
        type: Date,
        required: true
    },
    QrCode: {
        type: String,
        required: true
    },
    PdfFile: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Pass", PassModel);