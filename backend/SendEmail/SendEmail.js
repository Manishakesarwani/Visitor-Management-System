const {Resend} = require("resend");
const fs=require("fs");
const path=require("path");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});

const resend = new Resend(process.env.RESEND_API_KEY);

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        // console.log(reciever, emailSubject, emailBody);

        // const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        //     method: "POST",
        //     headers: {
        //         "api-key": process.env.API_KEY,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         sender: {name: "VisitorManagementSystem", email: "manishakesarwani9354@gmail.com"},
        //         to: [{email: reciever}],
        //         subject: emailSubject,
        //         htmlContent: emailBody
        //     })
        // });
        // const json = await response.json();

        const response = await resend.emails.send({
            from: "VisitorManagementSystem <onboarding@resend.dev>",
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

        const pdfbase = fs.readFileSync(f_path, {encoding: "base64"});

        // const pdf = fs.readFileSync(f_path);

        // const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        //     method: "POST",
        //     headers: {
        //         "api-key": process.env.API_KEY,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         sender: {name: "VisitorManagementSystem", email: "manishakesarwani9354@gmail.com"},
        //         to: [{email: reciever}],
        //         subject: emailSubject,
        //         htmlContent: emailBody,
        //         attachment: [
        //         {
        //             content: pdfbase,
        //             name: vis_name,
        //             type: "application/pdf"
        //         }
        //     ]
        //     })
        // });
        // const json = await response.json();

        const response = await resend.emails.send({
            from: "VisitorManagementSystem <onboarding@resend.dev>",
            to: reciever,
            subject: emailSubject,
            html: emailBody,
            attachments: [
                {
                    filename: vis_name,
                    content: pdfbase
                }
            ]
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