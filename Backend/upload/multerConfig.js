import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where the files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix); // Append unique suffix to the file name
    },
});

// Set up Multer
const upload = multer({ storage: storage });

export default upload;
