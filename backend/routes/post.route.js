const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authJwt = require("../middlewares/auth.middleware");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");

// create new post
router.post(
  "/",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  postController.createPost
);

// get all posts
router.get("/", postController.getAllPosts);

// get post by id
router.get("/:id", postController.getPostById);

// delete post by id
router.delete("/:id", authJwt.verifyToken, postController.deletePost);

// update post by id
router.put(
  "/:id",
  authJwt.verifyToken,
  upload,
  uploadToFirebase,
  postController.updatePost
);

module.exports = router;
