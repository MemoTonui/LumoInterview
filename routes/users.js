import express from "express";
import {
  createProfile,
  updateUser,
  deleteUser,
  findUserById,
  getUsers,
  getUsersPosts,
} from "../controllers/users.js";
const router = express.Router();

router.get("/", getUsers);

router.post("/", createProfile);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", findUserById);

router.get("/:id/posts", getUsersPosts);

export default router;
