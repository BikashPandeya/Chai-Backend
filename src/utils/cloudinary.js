// Import the cloudinary library and fs module for file system operations
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config(); // Make sure this is called before any other code

// Cloudinary configuration using environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloud name for the Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY, // API key for authentication
  api_secret: process.env.CLOUDINARY_API_SECRET, // API secret for secure access
});

// Function to upload a file to Cloudinary from a local file path
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, return null (indicating no file to upload)
    if (!localFilePath) {
      console.error("❌ No file path provided");
      return null;
    }

    // Upload the file to Cloudinary with the 'auto' resource type (auto detects file type)
    console.log("🚀 Uploading file to Cloudinary:", localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detects the type of resource (image, video, etc.)
    });

    // Log a success message with the URL of the uploaded file
    console.log("✅ File uploaded on Cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    // Return the response from Cloudinary, which contains information like the file's URL
    return response;
  } catch (error) {
    // If an error occurs (upload fails), log the error
    console.error("❌ Error uploading file to Cloudinary:", error.message);

    // In case of an error, remove the local file to avoid clutter
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("🗑️ Local file removed after upload failure");
    }

    // Return null to indicate that the upload failed
    return null;
  }
};

// Export the function to be used elsewhere in the application
export { uploadOnCloudinary };
