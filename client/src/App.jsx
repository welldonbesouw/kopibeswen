import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Account from "./pages/Account";
import SipStash from "./pages/SipStash";
import Admin from "./pages/Admin/Admin";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { AnimatePresence } from "framer-motion";
import Profile from "./pages/Profile";
import { useUser } from "./hooks/useUser";
import LoaderSpinner from "./components/LoaderSpinner";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductItem from "./pages/Menu/ProductItem";
import { Toaster } from "react-hot-toast";

function App() {
   const [showLogin, setShowLogin] = useState(false);
   const { user, checkAuth, checkingAuth } = useUser();

   useEffect(() => {
      checkAuth();
   }, [checkAuth]);

   function handleShowLogin() {
      setShowLogin(!showLogin);
   }

   return (
      <>
         <div
            className={`relative min-h-screen scroll-smooth bg-gradient-to-b from-[#F5F5DC] to-white to-80% pb-[63px] ${
               showLogin ? "blur-sm bg-black/30 pointer-events-none" : ""
            }`}>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/menu" element={<Menu />} />
               <Route path="/:id" element={<ProductItem />} />
               <Route path="/sip-stash" element={<SipStash />} />
               <Route path="/account" element={<Account handleShowLogin={handleShowLogin} />} />
               <Route path="/profile" element={<Profile />} /> {/* TODO: only logged in user can access */}
               <Route path="/admin-dashboard" element={user?.role === "admin" ? <Admin /> : <Home />} />
               <Route path="/update-product/:id" element={user?.role === "admin" ? <UpdateProduct /> : <Home />} />
            </Routes>
            {checkingAuth && <LoaderSpinner />}
         </div>
         <Toaster />
         {/* show login window if showLogin state is true */}
         <AnimatePresence>{showLogin && <Auth handleShowLogin={handleShowLogin} />}</AnimatePresence>
      </>
   );
}

export default App;
