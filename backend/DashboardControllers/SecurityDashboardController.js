const Visitors = require("../models/VisitorModel");
const Appointments = require("../models/AppointmentModel");
const Pass = require("../models/PassModel");
const CheckLogs = require("../models/CheckInOutModel");

exports.getSecurityStatistics = async (req, res) => {

    try{
        
        const todayStart=new Date();
        todayStart.setHours(0,0,0,0);
        const todayEnd = new Date();
        todayEnd.setHours(23,59,59,999);

        const ch1=await Pass.countDocuments({
            AcceptableFrom:{
                $gte: todayStart,
                $lte: todayEnd
            }
        });
        const ch2=await Pass.countDocuments({
            AcceptableTill:{
                $gte: todayStart,
                $lte: todayEnd
            }
        });
        const t_chkin=ch1+ch2;
        const t_chk = await CheckLogs.countDocuments({
            CheckInTime: {
                $gte: todayStart,
                $lte: todayEnd
            },
            CheckOutTime: {
                $exists: false
            }
        });
        const expired_passes = await Pass.find({
            AcceptableTill: {
                $lt: todayStart
            }
        });
        let expired_passes_count = 0;
        for (const element of expired_passes) {
            const chk = await CheckLogs.findOne({PassID: element._id});
            if(!chk){
                expired_passes_count++;
            }
        }
        res.status(200).json({msg: "Security Statistics", t_chkin, t_chk,expired_passes_count});
    }catch(err){
        return res.status(400).json({error: err.message});
    }

}