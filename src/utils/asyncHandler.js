// A higher-order function that takes an async request handler and automatically handles errors
const asyncHandler = (requestHandler) => {   
    return (req, res, next) => {  // This function is returned and used in route handlers
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // If an error occurs, pass it to Express error handling
    };
};

// Exporting the asyncHandler function for use in route files
export { asyncHandler };


// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => {async() => {}}


// const asyncHandler = (fn) => async (req , res , next) => {
//     try {
//         await fn(req , res , next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false ,
//             message : error.message
//         })
//     }
// }