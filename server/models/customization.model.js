import mongoose from "mongoose";

const customizationSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Name is required"],
   },
   price: {
      type: Number,
      required: [true, "Price is required"],
   },
});

const Customization = mongoose.model("Customization", customizationSchema);

export default Customization;
