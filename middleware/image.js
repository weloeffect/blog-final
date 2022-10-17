const multer = require('multer')
const path = require('path')
// const {v4: uuidv4} = require('uuid')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null,Date.now()+'_'+file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const uploadImg = multer({ storage });

module.exports = uploadImg;