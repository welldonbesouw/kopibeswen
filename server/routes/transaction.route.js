import express from "express";
import { validateTransaction } from "../middleware/transaction.middleware.js";
import {
   createTransaction,
   getAllTransactions,
   getTransactionById,
   getTransactions,
   updateTransactionStatus,
} from "../controllers/transaction.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:orderId", protectRoute, validateTransaction, createTransaction);
router.get("/", protectRoute, getTransactions);
router.get("/all", protectRoute, adminRoute, getAllTransactions);
router.get("/:id", protectRoute, getTransactionById);
router.patch("/:id", protectRoute, updateTransactionStatus);

export default router;
