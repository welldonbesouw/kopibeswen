import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import ProductForm from "./ProductForm";
import { useLocation, useParams } from "react-router-dom";
import { LucideEdit } from "lucide-react";
import { useWindow } from "../../hooks/useWindow";

export default function UpdateProduct() {
   const { updateProduct, updateCustomization, loading } = useProduct();
   const { windowWidth, handleResize } = useWindow();
   const { id } = useParams();

   useEffect(() => {
      handleResize();
   }, [handleResize]);

   // for taking the state in Link state
   const location = useLocation();
   const { product } = location.state || {};

   const [productToUpdate, setProductToUpdate] = useState({
      name: product.name ? product.name : product.option,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category ? product.category : "customization",
      type: product.type,
      applicableTo: product.applicableTo,
   });

   return (
      <div className="pt-4">
         <div className="flex justify-end">
            <div className="flex items-center gap-2 bg-[#6F4E37] px-2 text-sm py-1 rounded-lg text-white font-semibold me-4">
               <LucideEdit size={16} />
               Update
            </div>
         </div>
         <div className="flex flex-col mx-2 sm:mx-8 md:w-[600px] md:mx-auto pt-6">
            <LucideEdit className="text-[#6F4E37] ms-36 sm:mx-auto sm:mb-4" size={windowWidth >= 640 ? 140 : 120} />
            <ProductForm
               product={productToUpdate}
               setProduct={setProductToUpdate}
               handleCustomizationAction={() =>
                  updateCustomization(id, {
                     option: productToUpdate.name,
                     price: productToUpdate.price,
                     type: productToUpdate.type,
                     applicableTo: productToUpdate.applicableTo,
                  })
               }
               handleProductAction={() =>
                  updateProduct(id, {
                     name: productToUpdate.name,
                     price: productToUpdate.price,
                     description: productToUpdate.description,
                     image: productToUpdate.image,
                     category: productToUpdate.category,
                  })
               }
               loading={loading}
            />
         </div>
      </div>
   );
}
