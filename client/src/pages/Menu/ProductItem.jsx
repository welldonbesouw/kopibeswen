import { useLocation, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useEffect, useState } from "react";
import LoaderSpinner from "../../components/LoaderSpinner";
import formatPrice from "../../utils/formatPrice";

export default function ProductItem() {
   const { id } = useParams();
   const { getProduct, loading } = useProduct();
   const location = useLocation();
   const [product, setProduct] = useState(location.state.product || null);

   useEffect(() => {
      if (!product) {
         const res = getProduct(id);
         console.log("fetched product is: ", product);
         setProduct(res);
      }
   }, [id, product, getProduct]);

   function handleSubmit() {
      console.log("Added to Cart");
   }

   return (
      <>
         {loading ? (
            <LoaderSpinner />
         ) : (
            <div className="relative flex flex-col w-full min-h-screen pt-14">
               <div className="mx-auto w-[350px] mb-4">
                  <img src={product.image} alt="product image" />
               </div>
               <h1 className="mx-4 text-xl font-bold text-stone-800">{product.name}</h1>
               <h3 className="w-64 mx-4 text-sm tracking-tight text-stone-400">{product.description}</h3>
               <hr className="mx-3 my-3" />
               <form onSubmit={handleSubmit}>
                  {/* Customizations */}
                  <h3 className="mx-4 font-semibold text-stone-800">Temperature</h3>
                  <div>
                     <select name="text" id="temperature" value=""></select>
                  </div>
                  {/* Add to Cart */}
                  <div className="fixed w-full py-4 bottom-16 border-t border-[#D4AE37]">
                     <div className="flex justify-between mx-3">
                        <h3 className="mb-2 text-lg font-bold text-stone-800">
                           <span className="text-sm">Rp</span>
                           {formatPrice(product.price)}
                        </h3>
                        <div>Quantity</div>
                     </div>
                     <div className="w-full px-2">
                        <button className="w-full text-center bg-[#6F4E37] rounded-full py-2 text-white font-bold">Add to Cart</button>
                     </div>
                  </div>
               </form>
            </div>
         )}
      </>
   );
}
