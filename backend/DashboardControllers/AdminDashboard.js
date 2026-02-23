const Visitors = require("../models/VisitorModel");
const Appointments = require("../models/AppointmentModel");
const Pass = require("../models/PassModel");
const CheckLogs = require("../models/CheckInOutModel");

exports.getAdminStatistics = async (req, res) => {

    try{
        const t_v = await Visitors.countDocuments();
        const t_a = await Appointments.countDocuments();
        const a_a = await Appointments.countDocuments({Status: "approve"});
        const r_a = await Appointments.countDocuments({Status: "rejected"});

        const t_checklogs = await CheckLogs.countDocuments();
        const t_passes = await Pass.countDocuments();

        const today = new Date();


        const a_p = await Pass.find({
            AcceptableFrom : {$lte: today},
            AcceptableTill : {$gte: today}
        });

        // console.log(a_p);

        let a_p_count=0;

        for (const element of a_p) {
            const chk_log = await CheckLogs.findOne({PassID: element._id});

            if(!chk_log || !chk_log.CheckOutTime){
                a_p_count++;
            }
        }
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
        res.status(200).json({msg: "Admin Statistics", t_v, t_a, a_a, r_a, a_p_count,t_chkin,t_passes,t_checklogs});
    }catch(err){
        return res.status(400).json({error: err.message});
    }

}