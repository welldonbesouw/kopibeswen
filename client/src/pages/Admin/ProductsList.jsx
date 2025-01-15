import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import ListItem from "./ListItem";
import { Boxes } from "lucide-react";
import { useWindow } from "../../hooks/useWindow";

export default function ProductsList() {
   const { getAllProducts, products, getCustomizations, customizations } = useProduct();
   const { windowWidth, handleResize } = useWindow();

   useEffect(() => {
      getAllProducts();
      getCustomizations();
      handleResize();
   }, [getAllProducts, getCustomizations, handleResize]);

   return (
      <div className="flex flex-col justify-center mx-4 pt-14 md:mx-auto md:w-[600px] sm:mx-8">
         <Boxes className="text-[#6F4E37] ms-24 sm:mx-auto sm:mb-8 mb-4" size={windowWidth >= 640 ? 150 : 120} />
         <table className="">
            <thead>
               <tr className="bg-[#D4AF37]/40">
                  <th className="text-[#6F4E37] w-48 py-1.5 rounded-l-lg text-left ps-8">Product name</th>
                  <th className="text-[#6F4E37] w-20 py-1.5">Availability</th>
                  <th className="text-[#6F4E37] w-20 py-1.5 rounded-r-lg">Action</th>
               </tr>
            </thead>
            <tbody className="mt-5">
               <tr className="h-3">
                  <td></td>
               </tr>
               <tr className="text-[#6F4E37]/70 font-bold">
                  <td colSpan={3} className="bg-[#D4AF37]/20 rounded-lg">
                     Coffee
                  </td>
               </tr>
               <ListItem products={products.filter((product) => product.category === "coffee")} />
               <tr className="h-2">
                  <td></td>
               </tr>
               <tr className="text-[#6F4E37]/70 font-bold">
                  <td colSpan={3} className="bg-[#D4AF37]/20 rounded-lg">
                     Non-coffee
                  </td>
               </tr>
               <ListItem products={products.filter((product) => product.category === "non-coffee")} />
               <tr className="h-2">
                  <td></td>
               </tr>
               <tr className="text-[#6F4E37]/70 font-bold">
                  <td colSpan={3} className="bg-[#D4AF37]/20 rounded-lg">
                     Food
                  </td>
               </tr>
               <ListItem products={products.filter((product) => product.category === "food")} />
               <tr className="h-2">
                  <td></td>
               </tr>
               <tr className="text-[#6F4E37]/70 font-bold">
                  <td colSpan={3} className="bg-[#D4AF37]/20 rounded-lg">
                     Customization
                  </td>
               </tr>
               <ListItem products={customizations} />
            </tbody>
         </table>
      </div>
   );
}
