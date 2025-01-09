import CapybaraHi from "../../assets/capybara-hi2.png";
import { CoffeeBeans, CreditCard, DocumentSigned, Globe, Interrogation, ShopLock, UserPen } from "../../assets/icons/Icons";
import AccountMenuItem from "./AccountMenuItem";
import { useUser } from "../../hooks/useUser";
import CoffeeMachine from "../../assets/coffee-machine.png";
import BeansGrinder from "../../assets/beans-grinder.png";
import Arabica from "../../assets/arabica.png";

const SipStashLevels = ["Brew Buddy", "Pour Partner", "Sip Sidekick", "Beswen Bestie"];
const accountMenu = [
   { id: "profile", label: "Profile", icon: UserPen },
   { id: "payments", label: "Payment Methods", icon: CreditCard },
   { id: "help", label: "Help Center", icon: Interrogation },
   { id: "language", label: "Language", icon: Globe },
   { id: "terms", label: "Terms of Services", icon: DocumentSigned },
   { id: "policy", label: "Privacy Policy", icon: ShopLock },
   { id: "about", label: "About Kopi Beswen", icon: CoffeeBeans },
];

export default function Account({ handleShowLogin }) {
   const { user } = useUser();

   return (
      <>
         <div className="relative flex px-4 pt-8 sm:justify-center lg:mb-20">
            <div className="absolute flex h-[120px] top-9 left-5 sm:left-10 w-60 sm:top-[46px] md:top-7 md:left-4 md:w-[300px] md:h-40">
               <p className="text-[#6F4E37] flex items-center justify-center w-full text-2xl md:text-[26px] z-30 font-bold">
                  Hey, {user?.name || "Bestfriend"}!
               </p>
            </div>
            <div className="flex justify-center sm:mr-auto max-h-72 lg:gap-10 xl:gap-12">
               <img src={CapybaraHi} alt="capybara saying hello" className="w-96 sm:w-[450px] md:w-[450px] z-20" />
               <img src={CoffeeMachine} alt="coffee machine" className="hidden md:inline-block w-60 h-60 mt-[42px] ml-8" />
               <img src={BeansGrinder} alt="beans grinder" className="hidden mt-[50px] -ml-7 lg:inline-block w-60 h-60" />
               <img src={Arabica} alt="arabica beans" className="hidden mt-[70px] -ml-6 xl:inline-block w-52 h-52" />
            </div>

            {!user && (
               <button
                  onClick={handleShowLogin}
                  className="absolute top-[240px] left-6 bg-[#6F4E37] sm:top-72 sm:left-14 sm:text-lg md:text-lg md:px-8 md:top-[300px] sm:px-6 sm:py-1 px-4 py-1 text-white rounded-full focus:outline-[#D4AF37] lg:right-12 lg:left-auto lg:top-4 z-50">
                  Login
               </button>
            )}
         </div>
         <div className="mt-10 sm:px-8 sm:flex sm:flex-col sm:justify-center lg:grid lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
            {accountMenu.map((menu) => (
               <AccountMenuItem key={menu.id} id={menu.id} label={menu.label} Icon={menu.icon} />
            ))}
         </div>
      </>
   );
}
