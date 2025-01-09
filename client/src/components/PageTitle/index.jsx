export default function PageTitle({ title }) {
   return (
      <div className="flex items-center justify-end h-14 me-6">
         <h3 className="text-lg font-semibold text-[#6F4E37] border-l-2 ps-3 pe-4 border-b-2 rounded-bl-lg rounded-tl-xl rounded-br-2xl border-[#D4AF37]">
            {title}
         </h3>
      </div>
   );
}
