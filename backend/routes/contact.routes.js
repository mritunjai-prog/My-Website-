import express from "express";
import { body } from "express-validator";
import {
  submitContactForm,
  getAllContacts,
} from "../controllers/contact.controller.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Validation rules
const contactValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message must be at least 10 characters long"),
];

router.post("/", contactValidation, validate, submitContactForm);
router.get("/", getAllContacts); // For admin use - add auth middleware in production

export default router;
