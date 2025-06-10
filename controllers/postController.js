const postModel = require("../models/postModel");
exports.createPost = async (req, res) => {
  const body = req.body;
  try {
    const newPost = await postModel.create({ ...body });
    return res.status(201).json({ newPost });
  } catch (error) {
    res.send(error.message);
  }
};
exports.getSinglePost = async (req, res) => {
  const { postId } = req.params;
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
  const { userId } = req.body;
  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.send("post not found");
    }
    if (userId != post.creator) {
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
