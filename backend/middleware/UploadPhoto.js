const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb_func) => {
        cb_func(null, "uploads/");
    },
    filename: (req, file, cb_func) => {
        const ext = path.extname(file.originalname);
        cb_func(null, Date.now()+ext);
    }
});

const upload = multer({storage});

module.exports=upload;