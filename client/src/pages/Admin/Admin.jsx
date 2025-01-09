import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductsList from "./ProductsList";
import AnalyticsTab from "./AnalyticsTab";
import { Boxes, ChartNoAxesCombined, PackagePlus } from "lucide-react";

const adminMenu = [
   { id: "add", label: "Add Product", icon: PackagePlus },
   { id: "products", label: "Products List", icon: Boxes },
   { id: "analytics", label: "Analytics", icon: ChartNoAxesCombined },
];
export default function Admin() {
   const [activeTab, setActiveTab] = useState("add");
   return (
      <div className="min-h-full">
         <div className="absolute flex flex-col gap-3 mt-5 right-2">
            {adminMenu.map((menu) => (
               <button
                  key={menu.id}
                  className={`ml-auto flex px-2 items-center py-1 rounded-lg justify-end text-[#6F4E37] text-sm font-semibold ${
                     activeTab === menu.id ? "text-white bg-[#6F4E37]" : ""
                  }`}
                  onClick={() => setActiveTab(menu.id)}>
                  <menu.icon className="w-5 h-5 mr-2" />
                  {menu.label}
               </button>
            ))}
         </div>
         {activeTab === "add" && <AddProduct />}
         {activeTab === "products" && <ProductsList />}
         {activeTab === "analytics" && <AnalyticsTab />}
      </div>
   );
}
