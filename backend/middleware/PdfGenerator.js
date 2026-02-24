const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");

const PdfGenerator = (visitor_JSON, QRCODE) => {
    return new Promise((resolve, reject)=>{
        try{
            // Create a new PDF file.
            const pdf_file = new pdfkit();

            //Generate filename to this file.
            const file_name = `VisitorPass - ${Date.now()}.pdf`;

            //Adding a path to save this file.
            const file_path = `VisitorPasses/${file_name}`;

            const photo_path = visitor_JSON.Photo.replace(/\\/g,"/");
            const f_path = path.join(__dirname, "../", photo_path);

            // Save Pdf to a new file
            pdf_file.pipe(fs.createWriteStream(file_path));

            //Adding Visitor information to this file.
            pdf_file.fontSize(20).text("Visitor Pass", {align: 'center'});
            pdf_file.moveDown();

            pdf_file.image(f_path, {width: 150});
            pdf_file.moveDown();
            pdf_file.fontSize(16).text(`Visitor Name: ${visitor_JSON.Name}`);
            pdf_file.fontSize(16).text(`Visitor Username: ${visitor_JSON.Username}`);
            pdf_file.fontSize(16).text(`Visitor Contact no.: ${visitor_JSON.PhoneNumber}`);
            pdf_file.moveDown();

            // //Adding QR Code
            pdf_file.image(QRCODE, {width: 150});

            pdf_file.end();

            //returning file path
            resolve(file_path);
        }catch(err){
            reject(err);
        }
    })
}

module.exports=PdfGenerator;