const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb_func) => {
        cb_func(null, "uploads/");
    },
    filename: (req, file, cb_func) => {
        cb_func(null, Date.now()+" - "+file.originalname);
    }
});

const upload = multer({storage});

module.exports=upload;