import { Link } from "react-router-dom";

export default function AccountMenuItem({ id, label, Icon }) {
   return (
      <div className="flex flex-col lg:items-center">
         <Link
            to={`/${id}`}
            className="flex items-center py-2 lg:py-4 rounded-2xl gap-4 lg:gap-1 focus:outline-[#D4AE37] lg:w-52 my-3 text-[#6F4E37] ms-6 lg:ms-0 lg:flex-col lg:my-1">
            <div className="mt-1">
               <Icon />
            </div>
            <p className="text-lg sm:text-xl">{label}</p>
         </Link>
         <div className="flex justify-center">
            <hr className="w-11/12 sm:w-[680px] border-[#6F4E37]/20 md:hidden" />
         </div>
      </div>
   );
}
