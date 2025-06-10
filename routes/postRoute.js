const express = require("express");
const {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getSinglePost,
} = require("../controllers/postController");
const router = require("./userRoute");
const route = express.Router();
route.post("/post", createPost);
route.get("/post", getPosts);
route.get("/post/:postId", getSinglePost);
route.delete("/post/:postId", deletePost);
router.put("/post/:postId/:userId", updatePost);
module.exports = route;
