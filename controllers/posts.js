import mongoose from "mongoose";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";


export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Create Post
export const createPost = async (req, res) => {
  //Get post id
  const { id: _id } = req.params;

  //Checks if the user exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This user does not exist");
  const myUser = await User.findById(_id);

  //Create A New Post
  const newPost = new Post(req.body);
  console.log("New Post", newPost);

  try {
    //Assign Post to User then save Post
    newPost.user = myUser;
    await newPost.save();
    //Push new Post To array of posts and save user
    myUser.posts.push(newPost);
    await myUser.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  //Checks if the post exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This post does not exist");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Post doesn't exist");

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post Deleted" });
};

export const findPostById = async (req, res) => {
  const { id: _id } = req.params;

  //Checks if the post exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This user does not exist");

  const post = await Post.findById(_id);
  res.json(post);
};
