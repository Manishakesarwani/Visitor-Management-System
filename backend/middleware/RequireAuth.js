const jwt = require("jsonwebtoken");
const user = require("../models/UserModel");

const RequireAuth = async(req, res, next) => {

    //Verify Authentication
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: 'Authorization required!'});
    }

    //Bearer tokenHeader.tokenPayload.tokenSignature

    console.log(authorization);

    const token = authorization.split(' ')[1];
    try{
        const {_id} = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await user.findOne({_id}).select('_id Role');
        next();

    }catch(e){
        console.log(e);
        res.status(401).json({error: 'Request not Authorized!'});
    }
}

const authRole = (user_roles) => {
    return (req, res, next) => {
        if(!user_roles.includes(req.user.Role)){
            console.log(req.user.Role);
            return res.status(403).json({error: "Access Denied!"});
        }
        next();
    }
}

module.exports = {RequireAuth, authRole};