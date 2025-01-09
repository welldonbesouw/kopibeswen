import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function Login({ phone, handleShowLogin }) {
   const { login, otpId } = useUser();
   const [otp, setOtp] = useState(new Array(6).fill(""));

   useEffect(() => {
      // auto-submit if all fields are filled
      if (otp.every((digit) => digit !== "")) {
         handleSubmit(otpId, otp.join(""));
      }
   }, [otp]);

   function handleChange(e, index) {
      if (/^\d$/.test(e.value)) {
         // ensure only single digit numbers
         // update current digit
         const newOtp = [...otp];
         newOtp[index] = e.value;
         setOtp(newOtp);

         // move to the next input field
         if (e.nextSibling && e.value) {
            e.nextSibling.focus();
         }
      } else {
         e.value = ""; // clear invalid input
         const newOtp = [...otp];
         newOtp[index] = e.value;
         setOtp(newOtp);
      }
   }

   function handleKeyDown(e, index) {
      if (e.key === "Backspace" && e.target.previousSibling) {
         // move to the previous input field if current is empty
         const newOtp = [...otp];
         newOtp[index] = "";
         setOtp(newOtp);
         e.target.previousSibling.focus();
      }
   }
   function handleFocus(e) {
      e.target.select();
   }

   function handlePaste(e) {
      e.preventDefault();
      const data = e.clipboardData.getData("Text").split("").slice(0, 6);
      if (data.every((char) => /^\d$/.test(char))) {
         setOtp(data);

         // auto-submit if all fields are filled after pasting
         if (otp.length === 6) {
            handleSubmit(otp.join(""));
         }
      }
   }

   function handleSubmit(otpId, otp) {
      login(otpId, otp, "0" + phone);
      handleShowLogin();
   }

   return (
      <motion.div className="mx-4" initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
         <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#6F4E37]">Enter OTP code</h1>
         <p className="text-sm font-light w-80 text-[#6F4E37]">
            A verification code has been sent via <strong>Whatsapp</strong> to <strong>+62 {phone}</strong>
         </p>
         <form onSubmit={handleSubmit}>
            <div onPaste={handlePaste} className="flex justify-between mt-4">
               {otp.map((value, index) => (
                  <input
                     key={index}
                     type="number"
                     maxLength="1"
                     value={value}
                     onChange={(e) => handleChange(e.target, index)}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                     onFocus={handleFocus}
                     className="h-24 text-center border rounded-2xl w-16 text-[#6F4E37] text-6xl border-[#D4AF37]/30 "
                  />
               ))}
            </div>
         </form>
      </motion.div>
   );
}
