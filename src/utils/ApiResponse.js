// A class to standardize API responses
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode; // HTTP status code (e.g., 200, 400, 500)
        this.data = data; // The actual response data (e.g., user info, list of items)
        this.message = message; // A message describing the response (default: "Success")
        this.success = statusCode < 400; // Boolean indicating if the response is successful (true if status < 400)
    }
}

export { ApiResponse }; // Export the class for use in other files
