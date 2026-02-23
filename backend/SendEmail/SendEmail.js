const email = require("nodemailer");

const senderInfo = email.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USERNAME_GMAIL,
        pass: process.env.PASSWORD
    }
});

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        // console.log(reciever, emailSubject, emailBody);
        await senderInfo.sendMail({
            from: process.env.USERNAME_GMAIL,
            to: reciever,
            subject: emailSubject,
            html: emailBody
        });
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}

exports.sendPass_Mail = async (reciever, emailSubject, emailBody, vis_name, f_path) => {
    try{
        // console.log(reciever, emailSubject, emailBody);
        await senderInfo.sendMail({
            from: process.env.USERNAME_GMAIL,
            to: reciever,
            subject: emailSubject,
            html: emailBody,
            attachments: [
                {
                    filename: vis_name,
                    path: f_path
                }
            ]
        });
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}