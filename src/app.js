// Importing required dependencies
import express from "express"; // Express framework for creating the server
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)
import cookieParser from "cookie-parser"; // Middleware to parse cookies from incoming requests

// Creating an Express application instance
const app = express();

// CORS Configuration - Allows requests from a specific origin (defined in environment variables)
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow only this origin (e.g., frontend URL)
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse JSON requests
app.use(express.json({
    limit: "16kb" // Restrict request body size to 16KB for security and performance
}));

// Middleware to parse URL-encoded requests (helps handle form data)
app.use(express.urlencoded({
    extended: true, // Allows nested objects in URL-encoded data
    limit: "16kb" // Restrict request body size to 16KB
}));

// Serve static files from the "public" directory (e.g., images, CSS, JS)
app.use(express.static("public"));

// Middleware to parse cookies in incoming requests
app.use(cookieParser());

// Export the Express app for use in other files (e.g., server.js)
export { app };
