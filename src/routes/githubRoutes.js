// GitHub routes
import express from "express";
import {
  analyzeProfile,
  getAllProfiles,
  getProfile,
  refreshProfile,
  getTopProfiles
} from "../controllers/githubController.js";

const router = express.Router();

router.post(
  "/profiles/:username",
  analyzeProfile
);

router.get(
  "/profiles",
  getAllProfiles
);

router.get(
  "/profiles/top",
  getTopProfiles
);

router.get(
  "/profiles/:username",
  getProfile
);

router.put(
  "/profiles/:username/refresh",
  refreshProfile
);

export default router;