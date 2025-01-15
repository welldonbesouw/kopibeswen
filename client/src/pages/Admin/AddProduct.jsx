import { PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import ProductForm from "./ProductForm.jsx";
import { useWindow } from "../../hooks/useWindow.js";

export default function AddProduct() {
   const { createProduct, createCustomization, loading } = useProduct();
   const [newProduct, setNewProduct] = useState({
      name: "",
      price: 0,
      description: undefined,
      image: undefined,
      category: "coffee",
      type: "temperature",
      applicableTo: undefined,
   });
   const { windowWidth, handleResize } = useWindow();

   useEffect(() => {
      handleResize();
   }, [handleResize]);

   return (
      <div className="flex flex-col mx-2 pt-14 sm:mx-8 sm:pt-16 md:w-[600px] justify-center md:mx-auto">
         <PackagePlus className="text-[#6F4E37] ms-24 sm:mx-auto sm:mb-8 " size={windowWidth >= 640 ? 150 : 120} />
         <ProductForm
            product={newProduct}
            setProduct={setNewProduct}
            handleCustomizationAction={() =>
               createCustomization({
                  option: newProduct.name,
                  price: newProduct.price,
                  type: newProduct.type,
                  applicableTo: newProduct.applicableTo,
               })
            }
            handleProductAction={() =>
               createProduct({
                  name: newProduct.name,
                  price: newProduct.price,
                  description: newProduct.description,
                  image: newProduct.image,
                  category: newProduct.category,
               })
            }
            loading={loading}
         />
      </div>
   );
}
