const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

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