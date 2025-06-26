import multer from "multer"
import path from 'path'
import fs from "fs"
import { join, __dirname } from "../utils/utils.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //cb -> callback
        const uploadPath = join(__dirname, "public", "img", "imgProductos"); //(lo que pasa si da error,lo que devuelve si no hay error) 
        try {
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        } catch (error) {
            console.error(error)
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); //le doy la extencion de la imagen original
        cb(null, file.fieldname + '-' + req.body.nombre + ext); //el nombre se puede cambiar
    }
});

const upload = multer({ storage });

export default upload;