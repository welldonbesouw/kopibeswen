import CoffeeCup from "../../assets/coffee-cup.png";
import { motion } from "framer-motion";
import { Cross } from "../../assets/icons/Icons";
import { useState } from "react";
import SendOtp from "./SendOtp";
import Login from "./Login";

export default function Auth({ handleShowLogin }) {
   const [phone, setPhone] = useState("");
   const [isOtpSent, setIsOtpSent] = useState(false);

   return (
      <div className="relative flex justify-center z-[9999]">
         <motion.div
            className="fixed bottom-0 flex flex-col h-5/6 bg-gradient-to-b from-white to-[#F5F5DC] w-full sm:top-[12%] sm:h-3/4 sm:w-[450px] rounded-t-3xl sm:rounded-3xl shadow-xl border-2 border-[#D4AF37] border-opacity-20"
            initial={{ y: 800 }}
            animate={{ y: 0 }}
            exit={{ y: 800 }}
            transition={{ duration: 0.3 }}>
            <button
               onClick={handleShowLogin}
               className="absolute flex items-center justify-center w-12 bg-white rounded-full shadow-lg right-3 -top-16">
               <Cross className="mt-2" />
            </button>
            <div className="flex flex-row-reverse me-10">
               <motion.div className="mt-2" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <img src={CoffeeCup} alt="coffee cup" className="-rotate-[20deg] w-52 sm:w-52 mb-6" />
               </motion.div>
            </div>
            {!isOtpSent ? (
               <SendOtp setIsOtpSent={setIsOtpSent} setPhone={setPhone} phone={phone} />
            ) : (
               <Login phone={phone} handleShowLogin={handleShowLogin} />
            )}
         </motion.div>
      </div>
   );
}
