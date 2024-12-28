const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authJwt = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/file.middleware");

// create new post
router.post("/", authJwt.verifyToken, upload, postController.createPost);

module.exports = router;
