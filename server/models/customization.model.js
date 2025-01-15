import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema({
   type: {
      type: String,
      required: true,
      enum: ["espresso", "temperature", "sugar", "ice", "milk"],
   },
   option: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      default: 0,
   },
   isAvailable: {
      type: Boolean,
      default: true,
   },
   applicableTo: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
      },
   ],
});

const Customization = mongoose.model("Customization", customizationSchema);

export default Customization;
