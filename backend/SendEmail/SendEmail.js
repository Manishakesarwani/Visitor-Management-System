const email = require("nodemailer");

const senderInfo = email.createTransport({
    host: process.env.HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.USERNAME_GMAIL,
        pass: process.env.PASSWORD
    }

});

exports.send_Mail = async (reciever, emailSubject, emailBody) => {
    try{
        // console.log(reciever, emailSubject, emailBody);
        const info = await senderInfo.sendMail({
            from: "manishakesarwani9354@gmail.com",
            to: reciever,
            subject: emailSubject,
            html: emailBody
        });
        console.log("Email sent", info.response);
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}

exports.sendPass_Mail = async (reciever, emailSubject, emailBody, vis_name, f_path) => {
    try{
        // console.log(reciever, emailSubject, emailBody);
        await senderInfo.sendMail({
            from: "manishakesarwani9354@gmail.com",
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
