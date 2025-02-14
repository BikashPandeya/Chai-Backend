// A custom error class for handling API errors in a structured way
class ApiError extends Error {
    constructor(
        statusCode, // The HTTP status code (e.g., 400 for Bad Request, 500 for Internal Server Error)
        message = "Something went wrong", // Default error message if none is provided
        errors = [], // An array to store additional error details (e.g., validation errors)
        stack = "" // The stack trace (useful for debugging)
    ) {
        super(message); // Call the parent 'Error' constructor with the error message

        this.statusCode = statusCode; // Store the HTTP status code
        this.data = null; // Default response data is null since this is an error
        this.message = message; // Store the provided error message
        this.success = false; // Always false, since this is an error response
        this.errors = errors; // Store any additional error details (e.g., input validation messages)

        // If a stack trace is provided, use it; otherwise, capture the current stack trace
        if (stack) {
            this.stack = stack; // Set the stack trace manually if provided
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace automatically
        }
    }
}

// Exporting the class for use in error handling across the project
export { ApiError };
