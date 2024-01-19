import express from "express";
import {
  contact,
  courseRequest,
  getDashBoardStats,
} from "../controllers/otherController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//Contact Form
router.route("/contact").post(contact);

//Request Form
router.route("/courserequest").post(courseRequest);

// Get Admin Dashboard Status
router
  .route("/admin/stats")
  .get(isAuthenticated, authorizeAdmin, getDashBoardStats);

export default router;
