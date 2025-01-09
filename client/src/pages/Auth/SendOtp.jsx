import { motion } from "framer-motion";
import { useUser } from "../../hooks/useUser";

export default function SendOtp({ setIsOtpSent, phone, setPhone }) {
   const { sendOtp } = useUser();

   function handleSendOtp(e) {
      e.preventDefault();

      sendOtp("0" + phone);
      setIsOtpSent(true);
   }

   return (
      <div>
         <motion.p
            className="text-3xl font-bold ms-6 text-[#6F4E37]"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Welcome
         </motion.p>
         <motion.p
            className="ms-6 text-[#6F4E37]/50 text-sm font-semibold mb-5"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Login or Sign up to your KOPI BESWEN account
         </motion.p>
         <form onSubmit={handleSendOtp}>
            <motion.div
               className="flex items-center mx-auto bg-[#6F4E37]/10 rounded-md px-4 py-2 w-11/12 gap-3 mb-3"
               initial={{ opacity: 0, y: -25 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}>
               <p className="text-2xl text-[#6F4E37]/70">+62</p>
               <input
                  type="tel"
                  className="text-2xl bg-transparent text-[#6F4E37] placeholder:text-[#6F4E37]/20 focus:outline-none"
                  placeholder="81234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
               />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
               {" "}
               <div className="tracking-tighter ms-5 me-6 text-[#6F4E37]/60 text-sm">
                  <input type="checkbox" name="terms" id="terms" className="me-2" required />
                  <label htmlFor="terms">
                     <span className="text-blue-400">* </span>I agree to the <span className="text-blue-400 underline">Beswen Terms of Service</span>{" "}
                     and <span className="text-blue-400 underline">Beswen Privacy Statement</span>.
                  </label>
               </div>
            </motion.div>
            <motion.div
               className="absolute bottom-0 flex items-center justify-center w-full"
               initial={{ opacity: 0, y: -25 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}>
               <button className="bg-[#6F4E37] w-full py-3 rounded-lg sm:rounded-2xl sm:mx-4 sm:mb-4 mx-2 my-2 text-white font-semibold text-lg">
                  Continue
               </button>
            </motion.div>
         </form>
      </div>
   );
}
