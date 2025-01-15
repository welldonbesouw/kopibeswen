import toast from "react-hot-toast";
import { Loading } from "../../assets/icons/Icons";
import { useEffect, useRef } from "react";
import { useProduct } from "../../hooks/useProduct";

export default function ProductForm({ product, setProduct, handleCustomizationAction, handleProductAction, loading }) {
   const { products, getAllProducts } = useProduct();
   const fileInputRef = useRef();

   useEffect(() => {
      getAllProducts();
   }, [getAllProducts]);

   async function handleSubmit(e) {
      e.preventDefault();
      console.log("product to add: ", product);
      try {
         if (product.category === "customization") {
            await handleCustomizationAction();
         } else {
            await handleProductAction();
         }
         // remove image value using useRef()
         if (fileInputRef.current) {
            fileInputRef.current.value = "";
         }
         // remove form inputs
         setProduct({ name: "", price: 0, description: undefined, category: "coffee", applicableTo: undefined, type: "" });
      } catch (error) {
         console.log("Error in creating product");
         toast.error(error.response.data.error);
      }
   }

   function handleApplicableToChange(e, item) {
      if (e.target.checked) {
         setProduct({ ...product, applicableTo: [...product.applicableTo, item._id] });
      } else {
         setProduct({ ...product, applicableTo: product.applicableTo.filter((p) => p !== item._id) });
      }
   }

   function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = function () {
            setProduct({ ...product, image: reader.result });
         };
         // base64 encoding
         reader.readAsDataURL(file);
      }
   }

   // change applicableTo to empty array from undefined
   useEffect(() => {
      if (product.category === "customization" && product.applicableTo === undefined) {
         setProduct({ ...product, applicableTo: [] });
      }
   }, [product.category]);

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 mb-10">
         <div className="mx-2">
            <label htmlFor="category" className="text-[#6F4E37]">
               Category
            </label>
            <div>
               <select
                  type="text"
                  id="category"
                  value={product.category ? product.category : "customization"}
                  className="text-[#6F4E37] font-light appearance-none mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                  <option value="coffee">Coffee</option>
                  <option value="non-coffee">Non-coffee</option>
                  <option value="food">Food</option>
                  {/* remove customization category if description or image is filled */}
                  {product.description === undefined && product.image === undefined ? <option value="customization">Customization</option> : <></>}
               </select>
            </div>
         </div>
         <div className="mx-2">
            <label htmlFor="name" className="text-[#6F4E37]">
               Product Name
            </label>
            <input
               type="text"
               id="name"
               value={product.name}
               onChange={(e) => setProduct({ ...product, name: e.target.value })}
               className="mt-2 text-[#6F4E37] font-light bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
            />
         </div>
         <div className="mx-2">
            <label htmlFor="price" className="text-[#6F4E37]">
               Price
            </label>
            <input
               type="text"
               id="price"
               value={product.price}
               onChange={(e) => setProduct({ ...product, price: e.target.value })}
               className="font-light mt-2 text-[#6F4E37] bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
            />
         </div>
         {product.category !== "customization" ? (
            <>
               <div className="mx-2">
                  <label htmlFor="description" className="text-[#6F4E37]">
                     Description
                  </label>
                  <textarea
                     type="text"
                     id="description"
                     value={product.description}
                     onChange={(e) => setProduct({ ...product, description: e.target.value })}
                     className="text-[#6F4E37] font-light mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                  />
               </div>
               <div className="mx-2">
                  <label htmlFor="image" className="text-[#6F4E37]">
                     Image
                  </label>
                  {product.image && (
                     <div className="my-1.5 ms-7">
                        <img src={product.image} alt="Product image" className="object-contain w-20 h-20" />
                     </div>
                  )}
                  <input
                     type="file"
                     id="image"
                     ref={fileInputRef}
                     onChange={handleImageChange}
                     className="text-[#6F4E37] file:text-white file:me-3 file:px-3 file:font-light font-light file:py-1 file:border-none file:rounded-lg file:bg-[#6F4E37] mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                     accept="image/*"
                  />
               </div>
            </>
         ) : (
            <>
               <div className="mx-2">
                  <label htmlFor="type" className="text-[#6F4E37]">
                     Type
                  </label>
                  <div>
                     <select
                        type="text"
                        id="type"
                        value={product.type}
                        className="text-[#6F4E37] font-light appearance-none mt-2 bg-[#6F4E37]/10 rounded-lg px-4 py-2 outline-none w-full"
                        onChange={(e) => setProduct({ ...product, type: e.target.value })}>
                        <option value="espresso">Espresso</option>
                        <option value="temperature">Temperature</option>
                        <option value="milk">Milk</option>
                        <option value="sugar">Sugar</option>
                        <option value="ice">Ice</option>
                     </select>
                  </div>
               </div>
               <div className="mx-2">
                  <label htmlFor="applicableTo" className="text-[#6F4E37]">
                     Applicable to
                  </label>
                  <div className="grid grid-cols-2 mx-1 mt-1 bg-[#6F4E37]/10 rounded-lg px-4 py-2">
                     {products.map((item) => (
                        <div key={item._id} className="flex gap-2 my-1 font-light tracking-tight text-[#6F4E37]">
                           <input
                              type="checkbox"
                              id={item._id}
                              checked={product.applicableTo?.includes(item._id)}
                              onChange={(e) => handleApplicableToChange(e, item)}
                           />
                           <label htmlFor={item._id}>{item.name}</label>
                        </div>
                     ))}
                  </div>
               </div>
            </>
         )}
         <button type="submit" className="bg-[#6F4E37] py-2 text-white font-semibold rounded-lg mx-2 mb-2 mt-1.5">
            {loading ? <Loading /> : "Add Product"}
         </button>
      </form>
   );
}
