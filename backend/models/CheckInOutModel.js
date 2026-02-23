const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CheckInOutModel = new Schema({
    SecurityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    PassID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pass',
        required: true
    },
    CheckInTime: {
        type: Date
    },
    CheckOutTime: {
        type: Date
    }

}, {timestamps: true});

module.exports=mongoose.model("CheckInOut", CheckInOutModel);