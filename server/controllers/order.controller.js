import mongoose from "mongoose";
import Customization from "../models/customization.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export async function getOrderItems(req, res) {
   const user = req.user;
   try {
      const order = await Order.findOne({ user: user.id, status: "pending" });
      const orderItemIds = order.items.map((item) => item.product.toString());
      const products = await Product.find({ _id: { $in: orderItemIds } });

      // const orderItems = products.map((product) => {
      //    const item = order.items.find((orderItem) => orderItem.id === product.id);
      //    return { ...product.toJSON(), quantity: item.quantity };
      // });

      const orderItems = order.items.map((orderItem) => {
         const productDetails = products.find((product) => product._id.toString() === orderItem.product.toString()); // if error change to: product._id.toString() === orderItem.product.toString()
         return { ...productDetails._doc, quantity: orderItem.quantity, customizations: orderItem.customizations, amount: orderItem.amount }; // if error change to: productDetails.toJSON()
      });

      res.json(orderItems);
   } catch (error) {
      console.log("Error in getOrderItems controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function addOrder(req, res) {
   const { productId } = req.params;
   const { customizations, quantity } = req.body;
   const user = req.user;

   try {
      let order = await Order.findOne({ user, status: "pending" });

      if (!order || order.length === 0) {
         order = await Order.create({
            user,
            items: [],
         });
      }

      const product = await Product.findById(productId);
      if (!product) {
         return res.status(404).json({ message: "Product not found" });
      }

      let amount = product.price;

      // find customization items then add the prices to the amount of order item
      let customizationItems = [];
      if (customizations && customizations.length > 0) {
         customizationItems = await Customization.find({ _id: { $in: customizations } });
         customizationItems.forEach((custom) => {
            amount += custom.price;
         });
      }

      // compare customizations
      function areArraysEqual(arr1, arr2) {
         if (arr1.length !== arr1.length) return false;
         // item is the customizations which is a type of ObjectId so we need to put toString() to get only the customization id
         const ids1 = arr1.map((item) => item.toString()).sort();
         const ids2 = arr2.map((item) => item.toString()).sort();

         return ids1.every((id, index) => id === ids2[index]);
      }

      // add quantity and amount if order & customizations are the same, otherwise create new order item
      const existingItem = order.items.find((item) => item.product.toString() === productId && areArraysEqual(item.customizations, customizations));
      if (existingItem) {
         existingItem.quantity += 1;
         // existingItem.amount += amount;
      } else {
         order.items.push({ product: productId, quantity, amount, customizations });
      }

      await order.save();
      res.json(order);
   } catch (error) {
      console.log("Error in addOrder controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

// export async function placeOrder(req, res) {
//    const user = req.user;
//    try {
//       let orderFromRedis = await redis.get(`order_details: ${user._id}`);
//       if (orderFromRedis) orderFromRedis = JSON.parse(orderFromRedis);

//       const order = await Order.create(orderFromRedis);

//       await redis.del(`order_details: ${user._id}`);

//       res.json(order);
//    } catch (error) {
//       console.log("Error in placeOrder controller", error.message);
//       res.status(500).json({ message: "Server error", error: error.message });
//    }
// }

export async function removeFromOrder(req, res) {
   const { orderItemId } = req.params;
   const user = req.user;
   try {
      const order = await Order.findOne({ user, status: "pending" });
      if (!order) return res.status(404).json({ message: "Order not found" });
      order.items = order.items.filter((item) => item.id !== orderItemId);

      await order.save();

      res.json(order.items);
   } catch (error) {
      console.log("Error in removeFromOrder controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function cancelOrder(req, res) {
   const { orderId } = req.params;
   try {
      await Order.findByIdAndDelete(orderId);
      res.json({ message: "Order cancelled" });
   } catch (error) {
      console.log("Error in cancelOrder controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function updateQuantity(req, res) {
   const { orderId, orderItemId } = req.params;
   const { quantity } = req.body;
   try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const orderItem = order.items.find((item) => item.id === orderItemId);
      if (orderItem) {
         if (quantity === 0) {
            orderItem = orderItem.filter((item) => item.id !== orderItemId);
            await order.save();
            return res.json(order);
         }

         orderItem.quantity = quantity;
         await order.save();
         res.json(order);
      } else res.status(404).json({ message: "Order item not found" });
   } catch (error) {
      console.log("Error in updateQuantity controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

// async function storeOrderDetails(userId, order) {
//    await redis.set(`order_details: ${userId}`, JSON.stringify(order), "EX", 60 * 60 * 24);
// }
