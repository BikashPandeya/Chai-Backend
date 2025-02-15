// Import mongoose and extract Schema from it
import mongoose, { Schema } from "mongoose";

// Import mongoose-aggregate-paginate-v2 for pagination support in aggregation queries
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the schema for the Video model
const videoSchema = new Schema(
    {
        // Stores the Cloudinary URL of the uploaded video file
        videoFile: {
            type: String,
            required: true,  // Video file is mandatory
        },
        // Stores the Cloudinary URL of the thumbnail image
        thumbnail: {
            type: String,
            required: true,  // Thumbnail is mandatory
        },
        // Title of the video
        title: {
            type: String,
            required: true,  // Title is mandatory
        },
        // Description of the video
        description: {
            type: String,
            required: true,  // Description is mandatory
        },
        // Duration of the video (in seconds or minutes, depending on the implementation)
        duration: {
            type: Number,
            required: true,  // Duration is mandatory
        },
        // Number of views the video has received
        views: {
            type: Number,
            default: 0,  // Default views set to 0
        },
        // Indicates whether the video is published or not
        isPublished: {
            type: Boolean,
            default: true,  // By default, videos are published
        },
        // Reference to the user (owner) who uploaded the video
        owner: {
            type: Schema.Types.ObjectId, // Stores the User's ObjectId
            ref: "User",  // References the "User" collection
        }
    },
    {
        timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
    }
);

// Add pagination support for aggregation queries
videoSchema.plugin(mongooseAggregatePaginate);

// Export the Video model using the defined schema
export const Video = mongoose.model("Video", videoSchema);
