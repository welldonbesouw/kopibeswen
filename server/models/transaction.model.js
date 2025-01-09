import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
   {
      gross_amount: {
         type: Number,
         required: true,
      },
      status: {
         type: String,
         enum: ["pending payment", "paid", "cancelled"],
         default: "pending payment",
      },
      // customer_name: {
      //    type: String,
      //    required: true,
      // },
      snap_token: {
         type: String,
      },
      snap_redirect_url: {
         type: String,
      },
      payment_method: {
         type: String,
         default: null,
      },
      order: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Order",
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
