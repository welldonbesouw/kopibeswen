/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            nunitoBold: ["Nunito-Bold"],
            nunitoLight: ["Nunito-Light"],
            nunitoMedium: ["Nunito-Medium"],
            nunitoRegular: ["Nunito-Regular"],
            nunitoSemiBold: ["Nunito-SemiBold"],
            pacifico: ["Pacifico-Regular"],
         },
      },
   },
   plugins: [],
};
