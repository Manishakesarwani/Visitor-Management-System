const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const VisitorModel = new Schema({
    Name: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Photo: {
        type: String,
        required: true
    },
    OrgId: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Visitor", VisitorModel);