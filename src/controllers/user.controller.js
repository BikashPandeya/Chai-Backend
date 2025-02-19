import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  // Validation - not empty
  // Check if user alreaady exists: username , email
  // Check for images , check for avatar
  // Upload them to cloudinary , avatar
  // Create user object - create entry in db
  // remove password and refresh token field from response
  // Check for user creation
  // Return response

  const { fullName, email, username, password } = req.body;
  console.log("email : ", email);



  // Check if any of the fields (fullName, email, username, password) are empty or only contain whitespace
  if (
    // Array of fields to check: fullName, email, username, password
    [fullName, email, username, password].some(
      (field) =>
        // Use optional chaining to safely apply trim() to each field, preventing errors if the field is null or undefined
        field?.trim() === "" // trim() removes leading/trailing spaces, and check if the result is an empty string
    )
  ) {
    // If any field is empty or only contains whitespace after trimming, throw an error
    // The ApiError is thrown with a 400 status and a message indicating that all fields are required
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or : [{ username } , { email }]
  })

  if(existedUser){
    throw new ApiError(409 , "User with email or username already exists")
  }

  const avatarLocalpath = req.files?.avater[0]?.path
  const coverTmageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalpath){
    throw new ApiError(400 , "Avatar file is required")
  }




});

export { registerUser };
