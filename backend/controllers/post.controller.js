const PostModel = require("../models/post.model");

// create new post
exports.createPost = async (req, res) => {
  const author = req.userId;
  const { title, summary, content } = req.body;
  if (!title || !summary || !content) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }
  const newPost = await PostModel.create({
    title,
    summary,
    content,
    cover: req.file.firebaseUrl,
    author,
  });

  res.status(201).json({ message: "Post created.", post: newPost });
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "Something error occurred while fetching posts!",
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id).populate("author", ["username"]);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while fetching post!",
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Access forbidden!" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while deleting post!",
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Access forbidden!" });
    }
    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }
    post.title = title;
    post.summary = summary;
    post.content = content;
    if (req.file) {
      post.cover = req.file.firebaseUrl;
    }
    await post.save();
    res.status(200).json({ message: "Post updated.", post });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while updating post!",
    });
  }
};
