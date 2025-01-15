import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export async function createProduct(req, res) {
   const { name, description, price, image, category } = req.body;

   try {
      let cloudinaryResponse = null;

      if (image) {
         cloudinaryResponse = await cloudinary.uploader.upload(image, {
            folder: "products",
         });
      }

      const product = await Product.create({
         name,
         description,
         price,
         image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
         category,
      });

      res.status(201).json({ product });
   } catch (error) {
      console.log("Error in createProduct controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getProduct(req, res) {
   const { id: productId } = req.params;
   try {
      if (!productId) return res.json(404).json("Product ID not found");

      const product = await Product.findById(productId);
      res.json(product);
   } catch (error) {
      console.log("Error in getProduct controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function deleteProduct(req, res) {
   const { id: productId } = req.params;
   try {
      if (!productId) return res.json(404).json("Product ID not found");

      await Product.findByIdAndDelete(productId);
      res.json(`Product ID ${productId} has been deleted successfully`);
   } catch (error) {
      console.log("Error in deleteProduct controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getAllProducts(req, res) {
   try {
      const products = await Product.find({});
      res.json(products);
   } catch (error) {
      console.log("Error in getAllProducts controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getProductsByCategory(req, res) {
   const { category } = req.params;
   try {
      const products = await Product.find({ category, isAvailable: true });
      res.json(products);
   } catch (error) {
      console.log("Error in getProductsByCategory controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function updateProduct(req, res) {
   const { id: productId } = req.params;
   const { name, price, description, image, category } = req.body;
   try {
      const product = await Product.findByIdAndUpdate(
         productId,
         {
            name,
            price,
            description,
            image: image ? image : (await Product.findById(productId).image) || "",
            category,
         },
         { new: true }
      );

      res.json(product);
   } catch (error) {
      console.log("Error in updateProduct controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function toggleAvailableProduct(req, res) {
   const productId = req.params.id;

   try {
      const product = await Product.findById(productId);
      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }

      product.isAvailable = !product.isAvailable;
      const updatedProduct = await product.save();

      res.json(updatedProduct);
   } catch (error) {
      console.log("Error in toggleAvailableProduct controller.", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}
