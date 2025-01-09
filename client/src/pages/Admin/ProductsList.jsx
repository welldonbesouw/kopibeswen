import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import ListItem from "./ListItem";

export default function ProductsList() {
   const { getAllProducts, products, getCustomizations, customizations } = useProduct();

   useEffect(() => {
      getAllProducts();
      getCustomizations();
   }, [getAllProducts, getCustomizations]);

   return (
      <div className="mx-4 mb-10 pt-36">
         <table className="">
            <thead>
               <tr className="bg-[#D4AF37]/40">
                  <th className="text-[#6F4E37] w-52 py-1.5 rounded-l-lg text-left ps-8">Product name</th>
                  <th className="text-[#6F4E37] w-24 py-1.5">Availability</th>
                  <th className="text-[#6F4E37] w-28 py-1.5 rounded-r-lg">Action</th>
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
