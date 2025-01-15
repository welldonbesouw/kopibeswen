import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useProduct = create((set) => ({
   products: [],
   customizations: [],
   loading: false,

   setProducts: (products) => set({ products }),

   createProduct: async (productData) => {
      set({ loading: true });
      try {
         const res = await axios.post("/products", productData);
         set((prevState) => ({
            products: [...prevState.products, res.data],
            loading: false,
         }));
         toast.success("Product has been created successfully.");
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to create product.");
      }
   },

   getCustomizations: async () => {
      set({ loading: true });
      try {
         const res = await axios.get("/customizations");
         set({ customizations: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to get customizations.");
      }
   },

   createCustomization: async (data) => {
      set({ loading: true });
      try {
         const res = await axios.post("/customizations", data);
         set((prevState) => ({
            customizations: [...prevState.customizations, res.data],
            loading: false,
         }));
         toast.success("Customization has been created successfully.");
      } catch (error) {
         console.log("error in createCustomization");
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to create customization.");
      }
   },

   getProduct: async (productId) => {
      set({ loading: true });
      try {
         const res = await axios.get(`/products/${productId}`);
         set({ loading: false });
         console.log("getProduct: ", res.data.product);
         return res.data;
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to get product.");
      }
   },
   getAllProducts: async () => {
      set({ loading: true });
      try {
         const res = await axios.get("/products");
         set({ products: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to fetch products.");
      }
   },

   fetchProductsByCategory: async (category) => {
      set({ loading: true });
      try {
         const res = await axios.get(`/products/category/${category}`);
         set({ products: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to fetch products.");
      }
   },

   toggleAvailableProduct: async (productId) => {
      set({ loading: true });
      try {
         const res = await axios.patch(`/products/toggleAvailable/${productId}`);
         set((prevState) => ({
            products: prevState.products.map((product) => (product._id === productId ? { ...product, isAvailable: res.data.isAvailable } : product)),
            loading: false,
         }));
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to update product.");
      }
   },

   updateProduct: async (productId, productData) => {
      set({ loading: true });
      try {
         const res = await axios.put(`/products/${productId}`, productData);
         set((prevState) => ({
            products: prevState.products.map((product) => (product._id === productId ? res.data : product)),
            loading: false,
         }));
         toast.success("Product has been updated successfully.");
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to update product.");
      }
   },

   deleteProduct: async (productId) => {
      set({ loading: true });
      try {
         await axios.delete(`/products/${productId}`);
         set((prevState) => ({
            products: prevState.products.filter((product) => product._id !== productId),
            loading: false,
         }));
         toast.success("Product has been deleted successfully.");
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to delete product.");
      }
   },

   updateCustomization: async (id, data) => {
      set({ loading: true });
      try {
         const res = await axios.put(`/customizations/${id}`, data);
         set((prevState) => ({
            customizations: prevState.customizations.map((customization) => (customization._id === id ? res.data : customization)),
            loading: true,
         }));
         toast.success("Customization has been updated successfully.");
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to update customization.");
      }
   },
}));
