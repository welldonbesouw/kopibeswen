import { LoaderPinwheel } from "lucide-react";

export default function LoaderSpinner({ test }) {
   return (
      <div className={`flex items-center justify-center min-h-screen bg-black/40 z-100 pointer-events-auto fixed top-0 left-0 w-full`}>
         <LoaderPinwheel className="text-slate-800 animate-spin" size={35} />
      </div>
   );
}
