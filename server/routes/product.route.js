import express from "express";
import {
   createProduct,
   deleteProduct,
   getAllProducts,
   getProduct,
   getProductsByCategory,
   toggleAvailableProduct,
   updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.get("/category/:category", getProductsByCategory);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.patch("/toggleAvailable/:id", protectRoute, adminRoute, toggleAvailableProduct);

// TODO: create combo products
// router.get("/combo", getComboProducts)

export default router;
