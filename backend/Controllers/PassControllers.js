const Pass = require("../models/PassModel");
const Appointment = require("../models/AppointmentModel");
const Visitor = require("../models/VisitorModel");
const QRGenerator = require("../middleware/QRGenerator");
const PdfGenerator = require("../middleware/PdfGenerator");
const {sendPass_Mail} = require("../SendEmail/SendEmail");
const path = require("path");
const {format} = require("date-fns");
const {Parser} = require("json2csv");

exports.getAllPass = async (req, res) => {
    const passes = await Pass.find()
    .populate("VisitorId", "Name Username PhoneNumber Photo")
    .populate("AppointmentId");

    try{
        if(!passes || passes.length<1){
            throw Error("No Pass found!");
        }
        else {
            return res.status(200).json(passes);
        }
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.createNewPass = async (req, res) => {
    try{
        const {AppointmentId} = req.body;

        if(!AppointmentId){
            throw Error("Please select appointment for which pass need to be generated.")
        }
        const appointment = await Appointment.findById(AppointmentId);
        // console.log(appointment.When);

        const today=new Date();
        if(appointment.When<=today){
            throw Error("Pass cannot be generated as appointment date is not valid now.");
        }
        const AcceptableFrom = new Date(appointment.When);
        const AcceptableTill = new Date(AcceptableFrom);
        AcceptableTill.setDate(AcceptableTill.getDate()+2);
        AcceptableTill.setMilliseconds(AcceptableTill.getMilliseconds()-1);

        // console.log(AcceptableTill);

        const visitor = await Visitor.findById(appointment.VisitorId._id);
        // console.log(visitor);

        const checkIfPassGenerated = await Pass.findOne({VisitorId: visitor._id});
        // console.log(checkIfPassGenerated);
        if(checkIfPassGenerated){
            throw Error("Pass is already generated for this visitor!");
            // return res.status(400).json({error: `Pass is already generated for this visitor!`});
        }

        // console.log(visitor);

        if(!checkIfPassGenerated){
            const QRCODE = await QRGenerator(AppointmentId.toString());

            const pdf_path = await PdfGenerator(visitor, QRCODE);

            const pass = await Pass.create({AppointmentId, VisitorId: visitor._id, AcceptableFrom, AcceptableTill, QrCode: QRCODE, PdfFile: pdf_path});

            const pass1 = await Pass.findById(pass._id)
            .populate("VisitorId", "Name Username PhoneNumber Photo")
            .populate("AppointmentId");

            const f_name = pass1.PdfFile.split("/");
            const f_path = path.join(__dirname, "../", pass1.PdfFile);


            await sendPass_Mail(pass1.VisitorId.Username, `Pass Generated`, `Hi ${pass1.VisitorId.Name},<br><br>Your Pass for the requested appointment has been generated. Please find the attachment to review the same. You are requested to carry the same durring appointment.<br><br><b>Please note: Validity of this pass is ${format(new Date(pass1.AcceptableFrom), "MM/dd/yyyy")} to ${format(new Date(pass1.AcceptableTill), "MM/dd/yyyy")}</b><br><br>Thank you!`, f_name[1],f_path);

            return res.status(200).json(pass1);
        }

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.exportReqPasses = async (req, res) => {
    try{
        const passes = await Pass.find().populate("AppointmentId VisitorId").lean();
        const pass_info = passes.map((p)=>({
            Id: p._id,
            CreatedAt: p.createdAt,
            AppointmentID: p.AppointmentId?._id,
            Visitor_Name: p.VisitorId?.Name,
            Visitor_Username: p.VisitorId?.Username,
            Visitor_Number: p.VisitorId?.PhoneNumber,
            ValidFrom: p.AcceptableFrom,
            ValidTill: p.AcceptableTill
        }));
        const pass_parser = new Parser();

        const pass_csv = pass_parser.parse(pass_info);
        res.header("Content-Type", "text/csv");
        res.attachment("Passes.csv");
        res.send(pass_csv);
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}