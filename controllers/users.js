import mongoose from "mongoose";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProfile = async(req,res)=>{
  const user = req.body;

  const newUser = new User(user);
  try{
    await newUser.save();
    res.status(201).json(newUser)
  }catch{
    res.status(409).json({message: error.message});
  }
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  //Checks if the user exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This user does not exist");

  const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("User doesn't exist");

  await User.findByIdAndRemove(id);

  res.json({ message: "User Deleted" });
};

export const findUserById = async (req, res) => {
  const { id: _id } = req.params;

  //Checks if the user exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This user does not exist");

  const user = await User.findById(_id);
  res.json(user);
};

//Gets User's Posts
export const getUsersPosts = async (req, res) => {
  const { id: _id } = req.params;

  //Checks if the user exists and if the id is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("This user does not exist");

  const user = await User.findById(_id).populate('posts');
  if(user !== null){
    res.status(200).json(user.posts);
  }
  else{
    res.json({ message: "There are No Posts Here" });
  } 
};


