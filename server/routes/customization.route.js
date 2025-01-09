import express from "express";
import { createCustomization, deleteCustomization, getCustomizations, updateCustomization } from "../controllers/customization.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCustomizations);
router.post("/", protectRoute, adminRoute, createCustomization);
router.put("/:id", protectRoute, adminRoute, updateCustomization);
router.delete("/:id", protectRoute, adminRoute, deleteCustomization);

export default router;
