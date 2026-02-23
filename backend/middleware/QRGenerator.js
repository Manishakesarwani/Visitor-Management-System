const QRCODE = require("qrcode");

const QRGenerator = async (appointment_id) =>{
    try{
        return await QRCODE.toDataURL(appointment_id);
    }catch(err){
        throw Error("Unable to generate QR Code!");
    }
}
module.exports=QRGenerator;