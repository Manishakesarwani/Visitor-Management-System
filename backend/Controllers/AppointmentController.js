const Appointment = require("../models/AppointmentModel");
const {send_Mail} = require("../SendEmail/SendEmail");
const {Parser} = require("json2csv");

exports.getAllAppointments = async (req, res) => {
    const appointments = await Appointment.find()
    .populate("EmployeeId", "Name Username Role")
    .populate("VisitorId", "Name Username PhoneNumber").sort({When: -1});

    try{
        if(!appointments || appointments.length<1){
            throw Error("No Appointments found!");
        }
        else{
            return res.status(200).json(appointments);
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
    
    
}
exports.getEmployeeAppointments = async (req, res) => {
    const id = req.user._id;
    console.log(id);
    const appointments = await Appointment.find({EmployeeId: id})
    .populate("EmployeeId", "Name Username Role")
    .populate("VisitorId", "Name Username PhoneNumber").sort({When: -1});

    try{
        if(!appointments || appointments.length<1){
            throw Error("No Appointments found!");
        }
        else{
            return res.status(200).json(appointments);
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
    
    
}

exports.getFilteredAppointments = async (req, res) => {

    const {Status, From, To, id} = req.query;

    let app_query={};

    if(Status){
        app_query.Status=Status;
    }

    if(From && To){
        app_query.createdAt = {
            $gte: new Date(From),
            $lte: new Date(To)
        };
    }
    if(id){
        app_query.EmployeeId = req.user._id;
    }

    console.log("status", Status);
    
    const appointments = await Appointment.find(app_query)
    .populate("EmployeeId", "Name Username Role")
    .populate("VisitorId", "Name Username PhoneNumber").sort({When: -1});

    try{
        if(!appointments || appointments.length<1){
            throw Error("No Appointments found!");
        }
        else{
            return res.status(200).json(appointments);
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
    
    
}

exports.createNewAppointment = async (req, res) => {

    const {VisitorId, Objective, When} = req.body;


    try{
        if(!VisitorId || !Objective || !When){
            throw Error("Please mention all the fields.");
        }
        const appointment_chk = await Appointment.findOne({VisitorId: VisitorId});
        console.log(appointment_chk);
        console.log(VisitorId);
        const today = new Date();
        today.setHours(0,0,0,0);

        const dateParts = When.split("-");

        const date_sel = new Date(Number(dateParts[0]), Number(dateParts[1])-1, Number(dateParts[2]));

        date_sel.setHours(0,0,0,0);
        // console.log(date_sel, today, dateParts);
        if(appointment_chk){
            throw Error(`Appointment already exists with the status ${appointment_chk.Status}.`);
        }
        else if(date_sel<=today){
            throw Error("Please mention correct date.");
        }
        else{
            // console.log(When);
            const newWhen = new Date(`${When}T00:00:00+05:30`);
            // console.log(newWhen);
        const appointment = await Appointment.create({
            VisitorId,
            EmployeeId: req.user._id,
            Objective,
            When: newWhen
        });

        const populateAppointment = await Appointment.findById(appointment._id)
        .populate("EmployeeId", "Name Username Role")
        .populate("VisitorId", "Name Username PhoneNumber");
        return res.status(200).json(populateAppointment);
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.updateAppointmentStatus = async (req, res) => {
    const {Status} = req.body;
    const {id} = req.params;
    const appointment_Id = await Appointment.findById(id);

    try{
        if(!appointment_Id || appointment_Id.length<1){
            return res.status(400).json({error: `Id: ${id} not found!`});
        }
        else if(!Status){
            return res.status(400).json({error: `Please mention the status to be updated`});
        }
        const appointment = await Appointment.findOneAndUpdate({_id: id}, {Status}, {returnDocument: 'after'})
        .populate("EmployeeId", "Name Username Role")
        .populate("VisitorId", "Name Username PhoneNumber");

        if(!appointment || appointment.length<1){
            return res.status(400).json({error: "No appointment found!"});
        }
        // console.log(appointment);

        const sts = appointment.Status==="approve" ? "Approved" : appointment.Status==="rejected" ? "Rejected" : "Pending";

        if(appointment.Status==="approve"){
            await send_Mail(appointment.VisitorId.Username, `Appointment ${sts}`, `Hello ${appointment.VisitorId.Name}, <br><br>Your appointment is <b>${sts}</b>. Pass will be gernerated and share with you shortly.<br><br> Thank You!`);
        }

        res.status(200).json(appointment);
    }catch(err){
        console.log(err.message);
        res.status(400).json({error: err.message});
    }
}

exports.exportReqAppointments = async(req,res)=>{
    try{
        const appoint = await Appointment.find().populate("VisitorId EmployeeId").lean();

        const app_parser_info = appoint.map((app)=>({
            Id: app._id,
            createdAt: app.createdAt,
            Visitor_Name: app.VisitorId?.Name,
            Visitor_Username: app.VisitorId?.Username,
            Visitor_Number: app.VisitorId?.PhoneNumber,
            Employee_Created: app.EmployeeId?.Name,
            Employee_Role: app.EmployeeId?.Role,
            Objective: app.Objective,
            When: app.When,
            Status: app.Status
        }));

        const app_parser = new Parser();

        const app_csv = app_parser.parse(app_parser_info);
        res.header("Content-Type", "text/csv");
        res.attachment("Appointments.csv");
        res.send(app_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqAppAppointments = async(req,res)=>{
    try{
        const appoint = await Appointment.find({Status: "approve"}).populate("VisitorId EmployeeId").lean();

        const app_parser_info = appoint.map((app)=>({
            Id: app._id,
            createdAt: app.createdAt,
            Visitor_Name: app.VisitorId?.Name,
            Visitor_Username: app.VisitorId?.Username,
            Visitor_Number: app.VisitorId?.PhoneNumber,
            Employee_Created: app.EmployeeId?.Name,
            Employee_Role: app.EmployeeId?.Role,
            Objective: app.Objective,
            When: app.When,
            Status: app.Status
        }));

        const app_parser = new Parser();

        const app_csv = app_parser.parse(app_parser_info);
        res.header("Content-Type", "text/csv");
        res.attachment("Approved_Appointments.csv");
        res.send(app_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqRejAppointments = async(req,res)=>{
    try{
        const appoint = await Appointment.find({Status: "rejected"}).populate("VisitorId EmployeeId").lean();

        const app_parser_info = appoint.map((app)=>({
            Id: app._id,
            createdAt: app.createdAt,
            Visitor_Name: app.VisitorId?.Name,
            Visitor_Username: app.VisitorId?.Username,
            Visitor_Number: app.VisitorId?.PhoneNumber,
            Employee_Created: app.EmployeeId?.Name,
            Employee_Role: app.EmployeeId?.Role,
            Objective: app.Objective,
            When: app.When,
            Status: app.Status
        }));

        const app_parser = new Parser();

        const app_csv = app_parser.parse(app_parser_info);
        res.header("Content-Type", "text/csv");
        res.attachment("Rejected_Appointments.csv");
        res.send(app_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}