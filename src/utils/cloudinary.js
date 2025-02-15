// Import the cloudinary library and fs module for file system operations
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration using environment variables for security
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Cloud name for the Cloudinary account
    api_key: process.env.CLOUDINARY_API_KEY,        // API key for authentication
    api_secret: process.env.CLOUDINARY_API_SECRET   // API secret for secure access
});

// Function to upload a file to Cloudinary from a local file path
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // If no file path is provided, return null (indicating no file to upload)
        if (!localFilePath) {
            return null;
        }
        
        // Upload the file to Cloudinary with the 'auto' resource type (auto detects file type)
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"  // Automatically detects the type of resource (image, video, etc.)
        });
        
        // Log a success message with the URL of the uploaded file
        console.log("File is uploaded on cloudinary", response.url);
        
        // Return the response from Cloudinary, which contains information like the file's URL
        return response;
    } catch (error) {
        // If an error occurs (upload fails), remove the local file to avoid clutter
        fs.unlinkSync(localFilePath);
        
        // Return null to indicate that the upload failed
        return null;
    }
};

// Export the function to be used elsewhere in the application
export { uploadOnCloudinary };


    
  
