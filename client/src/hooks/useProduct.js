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
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error);
      }
   },

   getCustomizations: async () => {
      set({ loading: true });
      try {
         const res = await axios.get("/customizations");
         set({ customizations: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error);
      }
   },

   createCustomization: async (name, price) => {
      set({ loading: true });
      try {
         const res = await axios.post("/customizations", { name, price });
         set((prevState) => ({
            customizations: [...prevState.customizations, res.data],
            loading: false,
         }));
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error);
      }
   },

   getAllProducts: async () => {
      set({ loading: true });
      try {
         const res = await axios.get("/products");
         set({ products: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to fetch products");
      }
   },

   fetchProductsByCategory: async (category) => {
      set({ loading: true });
      try {
         const res = await axios.get(`/products/category/${category}`);
         set({ products: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to fetch products");
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
         toast.error(error.response.data.error || "Failed to update product");
      }
   },

   updateProduct: async (productId) => {
      set({ loading: true });
      try {
         const res = await axios.put(`/products/${productId}`);
         set((prevState) => ({
            products: prevState.products.map((product) => (product._id === productId ? res.data : product)),
            loading: false,
         }));
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to update product");
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
      } catch (error) {
         set({ loading: false });
         toast.error(error.response.data.error || "Failed to delete product");
      }
   },
}));
