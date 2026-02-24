const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const Visitor = require("../models/VisitorModel");
const validator = require("validator");
const {send_Mail} = require("../SendEmail/SendEmail");
const {Parser} = require("json2csv");

const createToken = (_id, role) => {
    return jwt.sign({_id: _id, role}, process.env.SECRET_KEY, {expiresIn: '3d'});
}

exports.loginUser = async(req, res) => {
    const {Username, Password} = req.body;

    try{
        const user = await UserModel.login(Username, Password);

        //create a token
        const token = createToken(user._id,user.Role);

        res.status(200).json({Name: user.Name, Username: Username, Role: user.Role, token});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.signupUser = async(req,res) => {
    const {Name, Username, Password, Role} = req.body;

    try{
        const user = await UserModel.signup(Name, Username, Password, Role);

        //create a token
        const token = createToken(user._id, user.Role);
        
        res.status(200).json({Name, Username, Role, token});

    }catch(err){
        res.status(400).json({error: err.message});
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
            throw Error("Please mention valid Mobile number.");
        }
        else if(!(req.file.mimetype.startsWith("image/png") || req.file.mimetype.startsWith("image/jpeg"))){
            throw Error("Please mention valid image(jpeg/png format only)!");
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
                OrgId: null
            });
            return res.status(200).json(visitor);
        }
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}

exports.signupUserViaAdmin = async(req,res) => {
    const {Name, Username, Password, Role} = req.body;

    try{
        const user = await UserModel.signup(Name, Username, Password, Role);

        //create a token
        const token = createToken(user._id, user.Role);
        await send_Mail(user.Username, `VMS Login Credentials`, `Hello ${user.Name}, <br><br>Please refer to the login credentials below to login to VMS Portal. <br>Username: ${user.Username}<br>Password: ${Password}<br><br> Thank You!`);
        res.status(200).json({Name, Username, Role, token});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

exports.getUsers = async(req,res)=>{
    try{
        const user = await UserModel.find({
            Role: { $in: ["employee", "security"]}
        });

        if(!user || user.length<1){
            throw Error("No Users found!");
        }
        else{
            return res.status(200).json(user);
        }
    }catch(err){
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqEmployee = async(req,res)=>{
    try{
        const visitors = await UserModel.find({Role: "employee"}).lean();

        const vis_parser = new Parser({
            fields: ["createdAt", "_id", "Name", "Username", "Role"]
        });

        const vis_csv = vis_parser.parse(visitors);
        res.header("Content-Type", "text/csv");
        res.attachment("Employee.csv");
        res.send(vis_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}

exports.exportReqSecurity = async(req,res)=>{
    try{
        const visitors = await UserModel.find({Role: "security"}).lean();

        const vis_parser = new Parser({
            fields: ["createdAt", "_id", "Name", "Username", "Role"]
        });

        const vis_csv = vis_parser.parse(visitors);
        res.header("Content-Type", "text/csv");
        res.attachment("Security.csv");
        res.send(vis_csv);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({error: err.message});
    }
}