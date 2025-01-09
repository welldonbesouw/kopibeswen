import { LogOut } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import { useUser } from "../../hooks/useUser";

export default function Profile() {
   const { user, logout } = useUser();

   function handleSubmit() {
      console.log("Submitted");
   }

   function handleLogout() {
      logout();
   }
   return (
      <>
         <PageTitle title="Profile" />
         <form onSubmit={handleSubmit} className="mx-6 mt-4 sm:mx-20 lg:w-[600px] lg:mx-auto">
            <div className="flex flex-col gap-1 mb-4">
               <label htmlFor="name" className="text-[#6F4E37] font-normal">
                  Name
               </label>
               <input
                  type="text"
                  id="name"
                  value={user?.name}
                  className="h-12 text-[#6F4E37] text-lg focus:outline-none bg-[#6F4E37]/10 rounded-md px-3 placeholder:text-[#6F4E37]/20"
                  placeholder="John Doe"
               />
            </div>
            <div className="flex flex-col gap-1 mb-4">
               <label htmlFor="email" className="text-[#6F4E37] font-normal">
                  Email
               </label>
               <input
                  type="text"
                  id="email"
                  value={user?.email}
                  className="h-12 text-[#6F4E37] text-lg focus:outline-none bg-[#6F4E37]/10 rounded-md px-3 placeholder:text-[#6F4E37]/20"
                  placeholder="johndoe@example.com"
               />
            </div>
            <div className="flex flex-col gap-1 mb-4">
               <label htmlFor="phone" className="text-[#6F4E37] font-normal">
                  Phone
               </label>
               <input
                  type="tel"
                  id="phone"
                  value={user?.phone}
                  className="h-12 text-[#6F4E37] text-lg focus:outline-none bg-[#6F4E37]/10 rounded-md px-3 placeholder:text-[#6F4E37]/20"
               />
            </div>
            <div className="flex flex-col gap-1 mb-4">
               <label htmlFor="gender" className="text-[#6F4E37] font-normal">
                  Gender
               </label>
               <select id="gender" className="text-[#6F4E37] text-lg h-14 px-3 bg-[#6F4E37]/10 rounded-md appearance-none focus:outline-none">
                  <option value="not specified">Not Specified</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
               </select>
            </div>
            <div className="flex flex-col gap-1 mb-6">
               <label htmlFor="dob" className="text-[#6F4E37]">
                  Date of Birth
               </label>
               <input type="date" id="dob" className="bg-[#6F4E37]/10 text-lg rounded-md h-12 px-3 text-[#6F4E37]" />
            </div>
            <div className="flex justify-center gap-4 mb-4">
               <button
                  type="button"
                  onClick={() => history.back()}
                  className="w-full py-2 text-[#6F4E37] text-lg font-semibold bg-stone-100 rounded-md ">
                  Cancel
               </button>
               <button type="submit" className="w-full py-2 rounded-md font-semibold text-lg bg-[#6F4E37] text-white">
                  Save
               </button>
            </div>
         </form>
         <div className="flex justify-center">
            <hr className="w-full mx-5" />
         </div>
         <div className="flex justify-center mx-6 mt-8 mb-6">
            <button className="w-full py-2 text-lg font-semibold text-white bg-red-800 rounded-md sm:mx-14 lg:w-[600px]" onClick={handleLogout}>
               <LogOut className="inline me-2" size={18} />
               Logout
            </button>
         </div>
      </>
   );
}
