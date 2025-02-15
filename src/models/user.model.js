// Import mongoose, Schema, and necessary libraries
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";  // For generating JWT tokens
import bcrypt from "bcrypt";    // For hashing and comparing passwords

// Define the schema for the User model
const userSchema = new Schema({
    // Username of the user, which must be unique, lowercase, and trimmed
    username: {
        type: String,
        required: true,   // Username is mandatory
        unique: true,     // Ensures that usernames are unique in the database
        lowercase: true,  // Converts the username to lowercase before saving
        trim: true,       // Removes leading and trailing spaces
        index: true       // Enables searching of this field in the database
    },
    // Email of the user, which must be unique, lowercase, and trimmed
    email: {
        type: String,
        required: true,   // Email is mandatory
        unique: true,     // Ensures that emails are unique
        lowercase: true,  // Converts the email to lowercase before saving
        trim: true,       // Removes leading and trailing spaces
    },
    // Full name of the user
    fullName: {
        type: String,
        required: true,   // Full name is mandatory
        trim: true,       // Removes leading and trailing spaces
        index: true       // Enables searching of this field
    },
    // Avatar image URL (stored in Cloudinary)
    avatar: {
        type: String,
        required: true,   // Avatar is mandatory
    },
    // Cover image URL (stored in Cloudinary)
    coverImage: {
        type: String,     // URL of the cover image
    },
    // Watch history for storing references to videos the user has watched
    watchHistory: [
        {
            type: Schema.Types.ObjectId,  // Referencing video documents by ObjectId
            ref: "video"                 // Points to the "video" collection
        }
    ],
    // Password field for user authentication
    password: {
        type: String,
        required: [true, 'Password is required']  // Password is mandatory
    },
    // Refresh token for generating new access tokens
    refreshToken: {
        type: String,  // Stores the refresh token as a string
    }
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Middleware to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    // If password is not modified, skip hashing
    if (!this.isModified("password")) { return next(); }

    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);

    // Proceed with saving the user document
    next();
});

// Instance method to check if the provided password matches the stored password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);  // Compare hashed password
}

// Instance method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,  // Secret for signing the token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY  // Expiry time for the access token
        }
    );
}

// Instance method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,  // Secret for signing the refresh token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY  // Expiry time for the refresh token
        }
    );
}

// Create and export the User model using the defined schema
export const User = mongoose.model("User", userSchema);
