import { create } from "zustand";

export const useWindow = create((set) => ({
   windowWidth: window.innerWidth,
   handleResize: () => {
      function resize() {
         set({ windowWidth: window.innerWidth });
      }
      window.addEventListener("resize", resize);

      return function () {
         window.removeEventListener("resize", resize);
      };
   },
}));
