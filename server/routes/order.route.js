import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addOrder, cancelOrder, getOrderItems, removeFromOrder, updateQuantity } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", protectRoute, getOrderItems);
router.post("/:productId", protectRoute, addOrder);
router.put("/:orderId/:orderItemId", protectRoute, updateQuantity);
router.delete("/:orderItemId", protectRoute, removeFromOrder);
router.delete("/cancel-order/:orderId", protectRoute, cancelOrder);
// router.post("/", protectRoute, placeOrder);

export default router;
