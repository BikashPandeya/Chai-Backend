// Import the 'dotenv' package to load environment variables from a .env file
import dotenv from "dotenv";

// Import the MongoDB connection function
import connectDB from "./db/index.js";

// Load environment variables from the specified file
dotenv.config({
    path: "./env" // Loads variables from the 'env' file into process.env
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        // Start the Express server once the database connection is successful
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });

        // Handle server-level errors
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error; // Rethrow error to prevent silent failures
        });
    })
    .catch((err) => {
        // Handle database connection failure
        console.log("MONGO DB connection failed!!!", err);
    });





/*
import express from "express"
const app = express()

( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error" , (error) => {
            console.log("Error: " , error);
            throw error
        })

        app.listen(`${process.env.PORT}` , () => {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })

    } catch (error) {
        console.error("Error: " , error)
        throw error 
    }
})()*/