import { Link } from "react-router-dom";

export default function NavbarItem({ to, Icon, name, onClick }) {
   return (
      <Link
         to={to}
         className="flex flex-col items-center justify-center shrink-0 px-4 pt-3 pb-1.5 sm:px-8 md:px-10 focus:outline-[#D4AE37] group hover:bg-[#F5F5DC] duration-200 h-full"
         onClick={onClick}>
         <Icon color="#6F4E37" className="mb-1" />
         <div className="text-xs font-bold text-[#6F4E37]">{name}</div>
      </Link>
   );
}
