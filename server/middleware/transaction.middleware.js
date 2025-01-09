import { check } from "express-validator";
import { errorValidation } from "./error.middleware.js";

export const validateTransactionStatus = [
   check("status").isIn(["pending payment", "paid", "cancelled"]).withMessage("Status must be one of pending payment, paid, cancelled"),
   errorValidation,
];

export const validateTransaction = [
   check("orderItems").isArray().withMessage("Order items must be an array"),
   check("orderItems.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
   errorValidation,
];
