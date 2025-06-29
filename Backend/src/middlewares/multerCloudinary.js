
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";

const storage = new CloudinaryStorage({ // este multer es si quisieramos usar multer para guardar en cloudinary
    cloudinary: cloudinary,
    params: {
        folder: "productos",
        allowed_formats: ["jpg", "png", "jpeg", "webp"]
    }
});

const upload = multer({ storage });


export default upload;