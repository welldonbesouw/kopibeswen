import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
   {
      code: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      expDate: {
         type: Date,
         required: true,
      },
   },
   { timestamps: true }
);

const Voucher = mongoose.model("Voucher", voucherSchema);

export default Voucher;
