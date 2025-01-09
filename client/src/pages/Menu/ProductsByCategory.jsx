// import { useEffect } from "react";
// import { useProduct } from "../../hooks/useProduct";
// import ProductItem from "./ProductItem";

// export default function ProductsByCategory({ category }) {
//    const { products, fetchProductsByCategory } = useProduct();

//    useEffect(() => {
//       fetchProductsByCategory(category);
//    }, [fetchProductsByCategory]);

//    return (
//       {products.map(product => (
//          <ProductItem product={product}/>
//       ))}
//    )
// }
