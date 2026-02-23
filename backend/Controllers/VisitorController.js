const Visitor = require("../models/VisitorModel");
const Appointment = require("../models/AppointmentModel");
const Pass = require("../models/PassModel");
const CheckInOut = require("../models/CheckInOutModel");
const {Parser} = require("json2csv");

const validator = require("validator");
const { fields } = require("../middleware/UploadPhoto");

exports.getAllVisitor = async(req, res) => {
    const visitors = await Visitor.find().sort({createdAt: -1});

    try{
        if(!visitors || visitors.length<1){
            // console.log("test");
            throw Error("No Visitors found!");
        }
        else{
            return res.status(200).json(visitors);
        }
    }catch(err){
        return res.status(400).json({error: err.message});
    }
    
    
}
exports.getSearchedVisitor = async(req, res) => {

    try{
        const {searchedVis} = req.query;
        let vis_query={};

        if(searchedVis){
            vis_query={
                $or: [
                    {Name: {$regex: searchedVis, $options: "i"}},
                    {Username: {$regex: searchedVis, $options: "i"}}
                ]
            };
        }
        // console.log(vis_query);
        // console.log(searchedVis);
        const visitors = await Visitor.find(vis_query).sort({createdAt: -1});
        if(!visitors || visitors.length<1){
            // console.log("test");
            throw Error("No Visitors found!");
        }
        else{
            return res.status(200).json(visitors);
        }
    }catch(err){
        return res.status(400).json({error: err.message});
    }
    
    
}

exports.addVisitor = async (req, res) => {
    
    const {Name, Username, PhoneNumber} = req.body;

    const visitor = await Visitor.findOne({Username: Username});

    console.log(PhoneNumber);

    try{
        // console.log(Name, Username, PhoneNumber, req.file);
        if(!Name || !Username || !PhoneNumber || !req.file){
            // res.status(404).json({error: "Please mention all the fields."});
            throw Error("Please mention all the fields.");
        }
        else if(validator.isNumeric(Name)){
            // res.status(404).json({error: 'Please mention name correctly!'});
            throw Error("Please mention name correctly!");
        }
        else if(!validator.isEmail(Username)){
            // res.status(404).json({error: 'Please mention valid email.'});
            throw Error("Please mention valid email.");
        }
        else if(!validator.isMobilePhone(PhoneNumber, "en-IN")){
            // res.status(400).json({error: 'Please mention valid Mobile number.'});
            throw Error("Please mention valid Mobile number and country code.");
        }
        else if(!(req.file.mimetype.startsWith("image/png") || req.file.mimetype.startsWith("image/jpeg"))){
            throw Error("Please mention valid image!");
        }
        else if(visitor){
            throw Error("Visitor already exists!")
        }
        else{
            const visitor = await Visitor.create({
                Name: Name,
                Username: Username,
                PhoneNumber: PhoneNumber,
                Photo: req.file ? req.file.path : null,
                OrgId: req.user._id
            });
            return res.status(200).json(visitor);
        }
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}

exports.removeVisitor = async(req, res) => {
    try{
        const {id} = req.params;
        const vis = await Visitor.findById(id);

        if(!vis){
            throw Error("Requested Visitor is not exist.");
        }
        else{
            // console.log("test");
            const app = await Appointment.find({VisitorId: id});
            const pa = await Pass.find({VisitorId: id});
            if(pa.length>0){
            const chk = await CheckInOut.find({PassID: pa[0]._id});

            if(chk.length>0){
                await CheckInOut.deleteOne({PassID: pa[0]._id});
            }
            }
            if(pa.length>0){
                await Pass.deleteOne({VisitorId: id});
            }
            if(app.length>0){
                await Appointment.deleteOne({VisitorId: id});
            }
            await Visitor.deleteOne({_id: vis._id});
            return res.status(200).json(vis);
        }
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqVisitors = async(req,res)=>{
    try{
        const visitors = await Visitor.find().lean();

        const vis_parser = new Parser({
            fields: ["createdAt", "_id", "Name", "Username", "PhoneNumber"]
        });

        const vis_csv = vis_parser.parse(visitors);
        res.header("Content-Type", "text/csv");
        res.attachment("Visitors.csv");
        res.send(vis_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}