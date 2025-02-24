import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path";

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
  // console.log("email : ", email);

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

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalpath = req.files?.avatar?.[0]?.path
    ? req.files.avatar[0].path.replace(/\\/g, "/") // Convert Windows \ to /
    : null;

  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path
  // ? req.files.coverImage[0].path.replace(/\\/g, "/")
  // : nu0ll;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatarlocalpath not found ");
  }
  // console.log("Received files:", req.files);

  const avatar = avatarLocalpath
    ? await uploadOnCloudinary(avatarLocalpath)
    : null;
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  // console.log("Avatar Upload Response:", avatar);
  // console.log("Cover Image Upload Response:", coverImage);

  // console.log("Avatar Path:", req.files?.avatar?.[0]?.path);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const CheckForUserCreation = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!CheckForUserCreation) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, CheckForUserCreation, "User registered successfully")
    );
});

export { registerUser };
