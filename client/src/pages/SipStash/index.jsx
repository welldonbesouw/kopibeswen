export default function SipStash() {
   return (
      <div className="absolute flex items-center justify-center w-full text-5xl top-80 font-pacifico">
         <div>
            <label htmlFor="check" className="relative flex w-20 h-10 bg-gray-100 rounded-full cursor-pointer">
               <input type="checkbox" id="check" className="sr-only peer" checked={false} />
               <span className="absolute w-2/5 h-4/5 rounded-full bg-[#6F4E37]/50 left-1 top-1 peer-checked:bg-[#6F4E37] peer-checked:left-11 transition-all duration-200"></span>
            </label>
         </div>
      </div>
   );
}
