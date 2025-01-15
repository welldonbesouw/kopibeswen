/* eslint-disable react/prop-types */
import { useProduct } from "../../hooks/useProduct";
import { CrossRed, Edit, Loading, Tick, Trash } from "../../assets/icons/Icons";
import { Link } from "react-router-dom";

export default function ListItem({ products }) {
   const { toggleAvailableProduct, loading, deleteProduct } = useProduct();

   function handleClick(product) {
      // if (product.category === "customization") return;
      toggleAvailableProduct(product._id);
   }

   return (
      <>
         {products.map((product) => (
            <tr key={product._id} className="text-[#6F4E37]">
               <td>{product.name ? product.name : product.option}</td>
               <td className="text-center">
                  <button
                     className={`h-10 cursor-pointer w-14 ${Object.keys(product).length <= 4 ? "cursor-not-allowed" : ""}`}
                     onClick={() => handleClick(product)}
                     disabled={Object.keys(product).length <= 4}>
                     {product.isAvailable || product.isAvailable === undefined ? <Tick /> : loading ? <Loading /> : <CrossRed />}
                  </button>
               </td>
               <td>
                  <div className="flex justify-center gap-3">
                     <Link to={`/update-product/${product._id}`} state={{ product }}>
                        <Edit />
                     </Link>
                     <button onClick={() => deleteProduct(product._id)}>
                        <Trash />
                     </button>
                  </div>
               </td>
            </tr>
         ))}
      </>
   );
}
