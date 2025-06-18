const postModel = require("../models/postModel");
const jwt = require("jsonwebtoken");
exports.createPost = async (req, res) => {
  const body = req.body;
  // const { token } = req.cookies;
  // const {token}=req.headers
  const { id } = req.user;
  try {
    console.log(req.user);
    const newPost = await postModel.create({ creator: id, ...body });
    return res.status(201).json({ newPost });
  } catch (error) {
    res.send(error.message);
  }
};
exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
  //   console.log(req.cookies.token);
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.send("No post");
    }
    res.json(post);
  } catch (error) {
    res.send(error);
  }
};
exports.getPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const posts = await postModel.find({ creator: userId });
    if (!posts) {
      return res.send("Post Not found");
    }
    return res.json({ posts });
  } catch (error) {
    return res.send(error.message);
  }
};
exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  const { admin, id } = req.user;
  // const { userId } = req.body;
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.send("post not found");
    }
    console.log(payload.admin);
    if (id != post.creator && !admin) {
      return res.send("you cant delete this post");
    }
    await postModel.findByIdAndDelete(postId);
    return res.send("post deleted succesfully");
  } catch (error) {
    res.send(error.message);
  }
};
exports.updatePost = async (req, res) => {
  const body = req.body;
  const { postId, userId } = req.params;
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.send("Post doesnt exist");
    }
    if (userId != post.creator) {
      return res.send("you cannot update this post");
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      postId,
      { ...body },
      { new: true }
    );
    return res.json(updatedPost);
  } catch (error) {
    return res.send(error.message);
  }
};
