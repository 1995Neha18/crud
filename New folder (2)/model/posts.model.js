const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
