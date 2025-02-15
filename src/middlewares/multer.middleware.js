// Import multer for handling file uploads
import multer from "multer";

// Configure the storage for the uploaded files using diskStorage
const storage = multer.diskStorage({
    // Define the destination folder for saving the uploaded files
    destination: function (req, file, cb) {
        // The 'cb' callback indicates where to store the files, in this case './public/temp' directory
        cb(null, './public/temp');
    },
    // Define the name for the uploaded file
    filename: function (req, file, cb) {
        // The 'cb' callback defines the filename for the uploaded file; using the original name of the file
        cb(null, file.originalname);
    }
});

// Create and export the multer upload middleware, passing the storage configuration
export const upload = multer({
    storage: storage  // Use the custom storage configuration defined earlier
});
