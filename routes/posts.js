import express from "express";
import { deletePost, findPostById, getPosts, createPost,updatePost} from "../controllers/posts.js";
const router = express.Router();

router.get("/", getPosts);


//User ID
router.post("/:id", createPost);

//Post Id
router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

router.get("/:id", findPostById);

export default router;