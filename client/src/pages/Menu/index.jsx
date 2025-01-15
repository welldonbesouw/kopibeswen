import { useEffect, useRef, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import ProductCard from "./ProductCard";

const categories = ["coffee", "non-coffee", "food"];

export default function Menu() {
   const { products, getAllProducts, getCustomizations } = useProduct();
   const [active, setActive] = useState();
   const coffee = useRef(null);
   const nonCoffee = useRef(null);
   const food = useRef(null);

   const categoryRef = {
      coffee,
      "non-coffee": nonCoffee,
      food,
   };

   function scrollToSection(elementRef) {
      window.scrollTo({
         top: elementRef.current.offsetTop,
         behavior: "smooth",
      });
   }

   useEffect(() => {
      getAllProducts();
      getCustomizations();
   }, [getAllProducts, getCustomizations]);

   // highlight category as user scrolls
   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  setActive(entry.target.getAttribute("data-category"));
               }
            });
         },
         { root: null, rootMargin: "0px 0px -60% 0px", threshold: 0 }
      );

      Object.keys(categoryRef).forEach((key) => {
         const ref = categoryRef[key];
         if (ref.current) {
            observer.observe(ref.current);
         }
      });

      return () => {
         observer.disconnect();
      };
   }, []);

   return (
      <div className="flex flex-col">
         <div className="fixed flex gap-3 mt-5 right-6">
            {categories.map((category) => (
               <h3
                  key={category}
                  className={`px-2 py-1 rounded-lg text-[#6F4E37]/90 text-sm font-semibold ${active === category ? "text-white bg-[#6F4E37]" : ""}`}
                  onClick={() => scrollToSection(categoryRef[category])}>
                  {category[0].toUpperCase() + category.slice(1)}
               </h3>
            ))}
         </div>
         <div className="flex flex-col gap-4 mx-4 mt-20">
            {/* mapping each category */}
            {categories.map((category) => (
               <div key={category}>
                  <h1
                     className="bg-[#D4AE37]/40 text-lg text-[#6F4E37] font-bold px-3 mb-4 py-1 rounded-lg"
                     data-category={category}
                     ref={categoryRef[category]}>
                     {category[0].toUpperCase() + category.slice(1)}
                  </h1>
                  {/* mapping products for each category */}
                  <div className="grid grid-cols-2 gap-2">
                     {products
                        .filter((product) => product.category === category)
                        .map((product) => (
                           <ProductCard key={product._id} product={product} />
                        ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
