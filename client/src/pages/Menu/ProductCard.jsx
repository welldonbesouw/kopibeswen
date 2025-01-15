import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

export default function ProductCard({ product }) {
   return (
      <Link to={`/${product._id}`} className="flex flex-col mx-auto mb-4 rounded-lg" state={{ product }}>
         <div className="rounded-lg w-52">
            <img src={product.image} alt="product image" className="rounded-lg" />
         </div>
         <h3 className="mt-1 font-bold ms-1 text-start text-stone-800">{product.name}</h3>
         <h5 className="ms-1 text-start text-stone-800">
            <span className="text-sm">Rp </span>
            {formatPrice(product.price)}
         </h5>
      </Link>
   );
}
