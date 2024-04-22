import mongoose from "mongoose";

// Schema
const blogSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      state: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
      },
      read_count: {
        type: Number,
        default: 0
      },
      reading_time: {
        type: Number,
        default: 0
      },
      tags: {
        type: [String],
        default: []
      },
      body: {
        type: String,
        required: true
      }
    },
    {
      timestamps: true,
    }
  );
  
  // Model
  const Blog = mongoose.model("Blog", blogSchema);
  export default Blog;