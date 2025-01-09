import { useProduct } from "../../hooks/useProduct";
import { CrossRed, Edit, Loading, Tick, Trash } from "../../assets/icons/Icons";

export default function ListItem({ products }) {
   const { toggleAvailableProduct, loading, updateProduct, deleteProduct } = useProduct();

   function handleClick(product) {
      if (product.category === "customization") return;
      toggleAvailableProduct(product._id);
   }

   return (
      <>
         {products.map((product) => (
            <tr key={product._id}>
               <td>{product.name}</td>
               <td>
                  <button
                     className={`h-10 cursor-pointer w-14 ${Object.keys(product).length <= 4 ? "cursor-not-allowed" : ""}`}
                     onClick={() => handleClick(product)}
                     disabled={Object.keys(product).length <= 4}>
                     {product.isAvailable || product.isAvailable === undefined ? <Tick /> : loading ? <Loading /> : <CrossRed />}
                  </button>
               </td>
               <td>
                  <div className="flex justify-center gap-3">
                     <button onClick={() => updateProduct(product._id)}>
                        <Edit />
                     </button>
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
