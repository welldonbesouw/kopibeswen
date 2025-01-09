import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         minlength: [3, "Name must be at least 3 characters"],
         maxlength: [50, "Name must be less than 50 characters"],
      },
      email: {
         type: String,
         unique: true,
         sparse: true,
         lowercase: true,
         trim: true,
      },
      phone: {
         type: String,
         required: [true, "Phone number is required"],
         unique: true,
      },
      gender: {
         type: String,
         enum: ["male", "female", "not specified"],
         default: "not specified",
      },
      paymentMethod: {
         type: String,
      },
      dateOfBirth: {
         type: Date,
      },
      sipStash: {
         type: Number,
         min: 0,
         default: 0,
      },
      voucher: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Voucher",
         },
      ],
      role: {
         type: String,
         enum: ["customer", "admin"],
         default: "customer",
      },
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
