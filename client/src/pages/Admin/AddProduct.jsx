import { PackagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import toast from "react-hot-toast";
import LoaderSpinner from "../../components/LoaderSpinner";

// TODO: integrate whatsapp otp
export default function AddProduct() {
   const { createProduct, createCustomization, loading } = useProduct();
   const [newProduct, setNewProduct] = useState({
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "coffee",
   });
   const fileInputRef = useRef();
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   useEffect(() => {
      function handleResize() {
         setWindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);

      return function () {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         if (newProduct.category === "customization") {
            await createCustomization(newProduct.name, newProduct.price);
         } else {
            await createProduct(newProduct);
         }
         // remove image value using useRef()
         fileInputRef.current.value = "";
         // remove form inputs
         setNewProduct({ name: "", price: 0, description: "", category: "" });
      } catch (error) {
         console.log("Error in creating product");
         toast.error(error.response.data.error);
      }
   }

   function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = function () {
            setNewProduct({ ...newProduct, image: reader.result });
         };
         // base64 encoding
         reader.readAsDataURL(file);
      }
   }

   return (
      <div className="flex flex-col mx-2 pt-14 sm:mx-8 sm:pt-16 md:w-[600px] md:mx-auto">
         <PackagePlus className="text-[#6F4E37] ms-24 sm:mx-auto sm:mb-8 " size={windowWidth >= 640 ? 150 : 120} />
         <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 mb-10">
            <div className="mx-2">
               <label htmlFor="category" className="text-[#6F4E37] ">
                  Category
               </label>
               <div className="">
                  <select
                     type="text"
                     name="category"
                     value={newProduct.category}
                     className="text-[#6F4E37]/90 font-light appearance-none mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                     onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
                     <option value="coffee">Coffee</option>
                     <option value="non-coffee">Non-coffee</option>
                     <option value="food">Food</option>
                     <option value="customization">Customization</option>
                  </select>
               </div>
            </div>
            <div className="mx-2">
               <label htmlFor="name" className="text-[#6F4E37] ">
                  Product Name
               </label>
               <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-2 text-[#6F4E37] font-light bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
               />
            </div>
            <div className="mx-2">
               <label htmlFor="price" className="text-[#6F4E37] ">
                  Price
               </label>
               <input
                  type="text"
                  name="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="font-light mt-2 text-[#6F4E37] bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
               />
            </div>
            {newProduct.category !== "customization" ? (
               <>
                  <div className="mx-2">
                     <label htmlFor="description" className="text-[#6F4E37] ">
                        Description
                     </label>
                     <textarea
                        type="text"
                        name="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="text-[#6F4E37] font-light mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                     />
                  </div>
                  <div className="mx-2">
                     <label htmlFor="image" className="text-[#6F4E37] ">
                        Image
                     </label>
                     <input
                        type="file"
                        name="image"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="text-[#6F4E37] file:text-white file:me-3 file:px-3 file:font-light font-light file:py-1 file:border-none file:rounded-lg file:bg-[#6F4E37] mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                        accept="image/*"
                     />
                  </div>
               </>
            ) : (
               <></>
            )}
            <button type="submit" className="bg-[#6F4E37] py-2 text-white font-semibold rounded-lg mx-2 mb-2 mt-1.5">
               Add Product
            </button>
            {loading && <LoaderSpinner />}
         </form>
      </div>
   );
}
