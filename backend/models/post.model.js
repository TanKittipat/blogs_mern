const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  cover: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const PostModel = model("Post", postSchema);

module.exports = PostModel;