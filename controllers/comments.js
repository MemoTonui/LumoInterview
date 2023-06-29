import mongoose from "mongoose";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentsModel.js";



export const getCommentsInAPost = async (req, res) => {
  const { id: _id } = req.params;

  //Checks if the post exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This post does not exist");

  const post = await Post.findById(_id).populate("comments");
  if(post !== null){
    res.status(200).json(post.comments);
  }
  else{
    res.json({ message: "There are No Comments Here" });
  }
};

//Add Comments To Posts
export const addCommentToPost = async (req, res) => {
  //Get post id
  const { id: _id } = req.params;

  //Checks if the post exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This post does not exist");
  const myPost = await Post.findById(_id);

  //Create A New Comment
  const newComment = new Comment(req.body);
  console.log("New Comment", newComment);

  try {
    //Assign Comment To Post then save Comment
    newComment.post = myPost;
    await newComment.save();
    //Push new Comment To array of comments and save post
    myPost.comments.push(newComment);
    await myPost.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { id: _id } = req.params;
  const comment = req.body;

  //Checks if the comment exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This comment does not exist");

  const updatedComment = await Comment.findByIdAndUpdate(_id, comment, { new: true });
  res.json(updatedComment);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Comment doesn't exist");

  await Comment.findByIdAndRemove(id);

  res.json({ message: "Comment Deleted" });
};

