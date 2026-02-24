const email = require("node-fetch");
const fs=require("fs");
const path=require("path");

require("dotenv").config({path: path.resolve(__dirname, "../.env")});


exports.send_SMS = async (reciever, SMSBody) => {
    try{
        // console.log(reciever, emailSubject, emailBody);

        const response = await fetch("https://api.brevo.com/v3/transactionalSMS/send", {
            method: "POST",
            headers: {
                "api-key": process.env.API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender: "VMS",
                recipient: reciever,
                content: SMSBody,
                type: "transactional",
                unicodeEnabled: false
            })
        });
        const json = await response.json();
        if(!response.ok){
            console.log("SMS sent failed", json);
        }
        else{
            console.log("SMS sent", json);
        }
    }catch(err){
        console.log("Error", err.message);
        throw err;
    }
}
