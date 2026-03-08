const {Resend} = require("resend");
const fs=require("fs");
const path=require("path");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const resend = new Resend(process.env.RESEND_API_KEY)

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        

        const response = await resend.emails.send({
            from: "VMS-verified-email@visitormanagementsystem.shop",
            to: reciever,
            subject: emailSubject,
            html: emailBody
        });
        if(response.error){
            console.log("Email sent failed", response.error);
        }
        else{
            console.log("Email sent", response.data);
        }
         
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}

exports.sendPass_Mail = async (reciever, emailSubject, emailBody, vis_name, f_path) => {
    try{
        // console.log(reciever, emailSubject, emailBody);


        const pdfbase = fs.readFileSync(f_path).toString("base64");

        // console.log(pdfbase);

        const response = await resend.emails.send({
            from: "VMS-verified-email@visitormanagementsystem.shop",
            to: reciever,
            subject: emailSubject,
            html: emailBody,
            attachments: [{
                name: vis_name.toLowerCase().endsWith(".pdf") ? vis_name : `${vis_name}.pdf`,
                content: pdfbase,
                contentType: "application/pdf",
                filename: vis_name
            }]
        });
        if(response.error){
            console.log("Email sent failed", response.error);
        }
        else{
            console.log("Email sent", response.data);
        }
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}