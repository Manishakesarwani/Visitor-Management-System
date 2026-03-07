const Mailjet = require("node-mailjet");
const fs=require("fs");
const path=require("path");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY
);

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        

        const response = await mailjet.post("send", {version: "v3.1"}).request({
            Messages:[{
                From: {
                    Email: "manishakesarwani9354@gmail.com",
                    Name: "Visitor Management System"
                },
                To: [{
                    Email: reciever
                }],
                Subject: emailSubject,
                TextPart: "Visitor Management System Notification",
                HTMLPart: emailBody
            }]
        })
         console.log("Email response", response.body);
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}

exports.sendPass_Mail = async (reciever, emailSubject, emailBody, vis_name, f_path) => {
    try{
        // console.log(reciever, emailSubject, emailBody);

        const pdfbase = fs.readFileSync(f_path, {encoding: "base64"});

        const response = await mailjet.post("send", {version: "v3.1"}).request({
            Messages:[{
                From: {
                    Email: "manishakesarwani9354@gmail.com",
                    Name: "Visitor Management System"
                },
                To: [{
                    Email: reciever
                }],
                Subject: emailSubject,
                TextPart: "Visitor Management System Notification",
                HTMLPart: emailBody,
                Attachments: [{
                    ContentType: "application/pdf",
                    Filename: vis_name,
                    Base64Content: pdfbase 
                }]
            }]
        })

        console.log("Email response", response.body);
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}