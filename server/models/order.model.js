import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
   },
   quantity: {
      type: Number,
      default: 1,
   },
   amount: {
      type: Number,
      required: true,
   },
   customizations: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Customization",
      },
   ],
   notes: {
      type: String,
   },
});
const orderSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      items: [orderItemSchema],
      status: {
         type: String,
         enum: ["pending", "awaiting payment", "in process", "pick-up", "completed", "cancelled"],
         default: "pending",
      },
   },
   { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
