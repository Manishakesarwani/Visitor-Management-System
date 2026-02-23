const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        enum: ["admin", "security", "employee"],
        required: true
    }
}, {
    timestamps: true
});

//Static signup method

UserSchema.statics.signup = async function (name, email, password, role){
    const exists = await this.findOne({Username: email});
    console.log(exists);

    if(!name || !email || !password || !role){
        throw Error("All fields are mandatory. Please mention all the fields.");
    }
    else if(exists){
        
        throw Error("Email already exists!");
    }
    else if(!(role.includes("admin") || role.includes("security") || role.includes("employee"))){
        throw Error("Invalid Role!");
    }
    else if(validator.isNumeric(name)){
        throw Error("Please mention correct name.")
    }
    else if(!validator.isEmail(email)){
        throw Error("Please mention valid email.");
    }
    else if(!validator.isStrongPassword(password)){
        throw Error("Password is not Strong. Please refer to the ℹ️ button to set password correctly.");
    }
    

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({Name: name, Username: email, Password: hash, Role: role});

    return user;
}

//Static login method

UserSchema.statics.login = async function (email, password){
    const user = await this.findOne({Username: email});

    if(!email || !password){
        throw Error("All fields are mandatory. Please mention all the fields.");
    }
    else if(!user){
        throw Error("You are not registered. Please signup first.");
    }

    const match =await bcrypt.compare(password, user.Password);

    // console.log(match);

    if(!match){
        throw Error("Incorrect Password.");
    }

    return user;
}

module.exports = mongoose.model('UserModel', UserSchema);