const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    fileName: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    limits: {
        fileSize: 100000 * 100
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|mp4|flv|mov|wmv|gif/;
        console.log('file', file.mimetype, file.originalname);
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimetype && extname) {
            return cb(null, true);
        }

        return cb(null, true)
        cb("Only images is supported");
    }

}
).single("images");

module.exports = upload;