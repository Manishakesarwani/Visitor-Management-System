const CheckInOut = require("../models/CheckInOutModel");
const Pass = require("../models/PassModel");
const {Parser} = require("json2csv");

exports.scanPassToUpdateAndCreateEntry = async(req, res) => {
    try{
        const {id} = req.params;

        const pass_id = await Pass.findById(id);

        const today=new Date();
        const todayStart=new Date();
        todayStart.setHours(0,0,0,0);

        const todayEnd = new Date();
        todayEnd.setHours(23,59,59,999);
        

        if(!pass_id){
            return res.status(404).json({error: `Pass is not valid!`});
        }
        else if(todayStart<pass_id.AcceptableFrom){
            return res.status(400).json({error: `Pass is not activated yet!`})
        }
        else if(todayEnd>pass_id.AcceptableTill){
            console.log("todayEnd",todayEnd);
            console.log("AcceptableTill", pass_id.AcceptableTill);
            console.log("today", today);
            return res.status(400).json({error: `Pass is expired!`});
        }

        const checkInOutLog = await CheckInOut.findOne({PassID: id});
        if(!checkInOutLog){
            const checkLog=await CheckInOut.create({SecurityID: req.user._id, PassID: pass_id._id, CheckInTime: today});
            return res.status(200).json(checkLog);
        }
        else if(!checkInOutLog.CheckOutTime){
            const checkLog = await CheckInOut.findOneAndUpdate({_id: checkInOutLog._id}, {CheckOutTime: today}, {new: true});
            return res.status(200).json({checkLog});
        }
        else {
            return res.status(400).json({error: `Pass is already used. Please check with admin!`});
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.getLogs = async(req, res) => {
    try{
        const logs = await CheckInOut.find();

        return res.status(200).json(logs);
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqChecklogs = async(req, res) => {
    try{
        const logs = await CheckInOut.find().populate("SecurityID PassID").lean();

        const log_info = logs.map((l)=>({
            ID: l._id,
            createdAt: l.createdAt,
            SecurityID: l.SecurityID?._id,
            SecurityName: l.SecurityID?.Name,
            SecurityUsername: l.SecurityID?.Username,
            SecurityNumber: l.SecurityID?.PhoneNumber,
            PassID: l.PassID?._id,
            CheckInTime: l.CheckInTime,
            CheckOutTime: l.CheckOutTime
        }));

        const log_parser=new Parser();

        const log_csv = log_parser.parse(log_info);
        res.header("Content-Type", "text/csv");
        res.attachment("Checklogs.csv");
        res.send(log_csv);
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}