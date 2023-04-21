const multer = require("multer");

const storage_store = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./src/uploads');
    },
    filename:function (req,file,cb){
        cb(null, file.originalname);  
    }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload_store = multer({
  storage: storage_store,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = {
    upload_store
}