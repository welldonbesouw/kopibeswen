import Order from "../models/order.model.js";
import Transaction from "../models/transaction.model.js";

export async function createTransaction(req, res) {
   const { orderId } = req.params;
   const { orderItems } = req.body;
   const user = req.user;
   try {
      const order = await Order.findById(orderId);
      if (!order) {
         return res.status(400).json({ message: "Order not found" });
      }
      console.log("order is:", order);
      const gross_amount = orderItems.reduce((sum, orderItem) => sum + orderItem.amount * orderItem.quantity, 0);
      const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`);
      console.log("gross_amount is:", gross_amount);
      console.log("authString is:", authString);

      const payload = {
         transaction_details: {
            order_id: orderId,
            gross_amount,
         },
         item_details: orderItems.map((orderItem) => ({
            id: orderItem._id,
            name: orderItem.name,
            price: orderItem.amount, // price instead of amount, because midtrans needed it
            quantity: orderItem.quantity,
            customizations: orderItem.customizations,
         })),
         customer_details: {
            name: user.name,
         },
         callbacks: {
            finish: `${process.env.CLIENT_URL}/order-status?transaction_id=${orderId}`,
            error: `${process.env.CLIENT_URL}/order-status?transaction_id=${orderId}`,
            pending: `${process.env.CLIENT_URL}/order-status?transaction_id=${orderId}`,
         },
      };
      const response = await fetch(`${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Basic ${authString}`,
         },
         body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status !== 201) {
         return res.status(400).json({ message: "Failed to create transaction" });
      }

      const transaction = await Transaction.create({
         gross_amount,
         user,
         order: orderId,
         snap_token: data.token,
         snap_redirect_url: data.redirect_url,
      });

      order.status = "awaiting payment";
      await order.save();
      res.json({
         data: {
            id: transaction._id,
            status: "pending payment",
            customer_name: user.name,
            order: orderId,
            orderItems,
            snap_token: data.token,
            snap_redirect_url: data.redirect_url,
         },
      });
   } catch (error) {
      console.log("Error in createTransaction controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getTransactions(req, res) {
   const { status } = req.query;
   const user = req.user;
   try {
      const transactions = await Transaction.find({ user, status });
      res.json(transactions);
   } catch (error) {
      console.log("Error in getTransactions", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getAllTransactions(req, res) {
   const { status } = req.query;
   try {
      const transactions = await Transaction.find({ status });
      res.json(transactions);
   } catch (error) {
      console.log("Error in getAllTransactions", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getTransactionById(req, res) {
   const { id: transactionId } = req.params;
   try {
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
         return res.status(400).json({ message: "Transaction not found" });
      }

      res.json(transaction);
   } catch (error) {
      console.log("Error in getTransactionById controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function updateTransactionStatus(req, res) {
   const { id: transactionId } = req.params;
   const { status } = req.body;
   // TODO: add payment method
   try {
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
         return res.status(400).json({ message: "Transaction not found" });
      }
      transaction.status = status;
      const updatedTransaction = await transaction.save();

      if (status === "paid") {
         const order = await Order.findById(transaction.order.toString());
         order.status = "in process";
         await order.save();
      }
      res.json(updatedTransaction);
   } catch (error) {
      console.log("Error in updateTransactionStatus", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}
