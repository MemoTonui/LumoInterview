import express from "express";
import { addCommentToPost, deleteComment, getCommentsInAPost, updateComment } from "../controllers/comments.js";
const router = express.Router();

router.get("/:id", getCommentsInAPost);

router.post("/:id/new", addCommentToPost);

router.patch("/:id", updateComment);

router.delete("/:id", deleteComment);


export default router;