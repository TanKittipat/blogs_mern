const PostModel = require("../models/post.model");

// create new post
exports.createPost = async (req, res) => {
  const { path } = req.file;
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }
  const newPost = await PostModel.create({
    title,
    summary,
    content,
    cover: path,
    author,
  });

  res.status(201).json({ message: "Post created.", post: newPost });
};
