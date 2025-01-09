import { Link } from "react-router-dom";
import Logo from "../../assets/LogoBW.png";
import { HamburgerSoda, Home, TreasureChest, User } from "react-flaticons";
import NavbarItem from "./NavbarItem";
import { HomeBlack, HamburgerSodaBlack, TreasureChestBlack, UserBlack, RectangleList, RectangleListBlack } from "../../assets/icons/Icons";
import { useState } from "react";

const navbarItems = [
   { name: "Home", to: "/", icon: Home, iconActive: HomeBlack },
   { name: "Menu", to: "/menu", icon: HamburgerSoda, iconActive: HamburgerSodaBlack },
   { name: "Sip Stash", to: "/sip-stash", icon: TreasureChest, iconActive: TreasureChestBlack },
   { name: "Orders", to: "/orders", icon: RectangleList, iconActive: RectangleListBlack },
   { name: "Account", to: "/account", icon: User, iconActive: UserBlack },
];

export default function Navbar() {
   const [activeTab, setActiveTab] = useState("Home");

   return (
      <div>
         <div className="absolute top-0 left-0 z-50">
            <div className="w-10 m-2 rounded-full shadow-xl">
               <Link to="/" className="focus:outline-none">
                  <img src={Logo} alt="BW logo" className="object-cover w-full rounded-full" />
               </Link>
            </div>
         </div>
         <div className="fixed bottom-0 left-0 right-0 w-full border-t border-[#D4AF37] bg-white h-16">
            <div className="flex items-center justify-between h-full mx-auto sm:w-5/6 md:w-9/12 lg:w-3/5 xl:w-3/6">
               {navbarItems.map((navbarItem) => (
                  <NavbarItem
                     to={navbarItem.to}
                     name={navbarItem.name}
                     key={navbarItem.name}
                     onClick={() => setActiveTab(navbarItem.name)}
                     Icon={activeTab === navbarItem.name ? navbarItem.iconActive : navbarItem.icon}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
