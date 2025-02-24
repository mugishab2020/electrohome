const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "productPhoto",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const productUplaod = multer({ storage });

module.exports = productUplaod;
