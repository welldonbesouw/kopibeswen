import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Product name is required"],
         unique: true,
      },
      description: {
         type: String,
         required: [true, "Description is required"],
      },
      price: {
         type: Number,
         required: [true, "Price is required"],
      },
      image: {
         type: String,
         require: [true, "Image is required"],
      },
      category: {
         type: String,
         enum: ["coffee", "non-coffee", "food"],
         default: "coffee",
      },
      isAvailable: {
         type: Boolean,
         default: true,
      },
   },
   { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
