import express from "express";
import { body } from "express-validator";
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/blog.controller.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Validation rules
const postValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("category")
    .optional()
    .isIn([
      "AI/ML",
      "Web Development",
      "Programming",
      "Tutorial",
      "Project",
      "Other",
    ]),
];

// Public routes
router.get("/", getAllPosts);
router.get("/:slug", getPostBySlug);
router.post("/:id/like", likePost);

// Admin routes - add auth middleware in production
router.post("/", postValidation, validate, createPost);
router.put("/:id", postValidation, validate, updatePost);
router.delete("/:id", deletePost);

export default router;
