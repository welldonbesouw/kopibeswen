import Customization from "../models/customization.model.js";

export async function getCustomizations(req, res) {
   try {
      const customizations = await Customization.find({});
      res.json(customizations);
   } catch (error) {
      console.log("Error in getCustomizations controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function createCustomization(req, res) {
   const { name, price } = req.body;
   try {
      const customization = await Customization.create({
         name: name.toLowerCase(),
         price,
      });
      res.json(customization);
   } catch (error) {
      console.log("Error in createCustomization controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function updateCustomization(req, res) {
   const { id } = req.params;
   const { name, price } = req.body;
   try {
      const customization = await Customization.findByIdAndUpdate(
         id,
         {
            name,
            price,
         },
         { new: true }
      );
      res.json(customization);
   } catch (error) {
      console.log("Error in updateCustomization controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function deleteCustomization(req, res) {
   const { id } = req.params;
   try {
      await Customization.findByIdAndDelete(id);
      res.json({ message: "Customization deleted successfully" });
   } catch (error) {
      console.log("Error in deleteCustomization", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}
