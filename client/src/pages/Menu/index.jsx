import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";

const categories = ["coffee", "non-coffee", "food"];

export default function Menu() {
   const { category } = useParams();
   const { products, fetchProductsByCategory } = useProduct();

   useEffect(() => {
      fetchProductsByCategory(category);
   }, [fetchProductsByCategory, category]);

   return (
      <div className="flex flex-col">
         <div className="fixed flex gap-3 mt-5 right-6">
            {categories.map((category) => (
               <Link to={`/${category}`} key={category} className="text-[#6F4E37]/90 text-sm font-semibold">
                  {category[0].toUpperCase() + category.slice(1)}
               </Link>
            ))}
         </div>
         {products.map((product) => (
            <div key={product.id}>{product.name}</div>
         ))}
         {/* {products && products.map((product) => <ProductItem product={product} key={product.id} />)} */}
      </div>
   );
}
