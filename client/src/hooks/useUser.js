import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUser = create((set, get) => ({
   user: null,
   otpId: "",
   loading: false,
   checkingAuth: true,

   sendOtp: async (phone) => {
      set({ loading: true });

      try {
         const res = await axios.post("/auth/send-otp", { phone });
         set({ otpId: res.data.otp_id, loading: false });
      } catch (error) {
         set({ loading: false });
         console.log(error);
         toast.error(error.response.data.message || "An error occurred during sending OTP");
      }
   },

   login: async (otp_id, otp, phone) => {
      set({ loading: true });

      try {
         const res = await axios.post("/auth/login", { otp_id, otp, phone });
         set({ user: res.data, loading: false });
      } catch (error) {
         set({ loading: false });
         console.log(error);
         toast.error(error.response.data.message || "An error occured during login");
      }
   },

   logout: async () => {
      try {
         await axios.post("/auth/logout");
         set({ user: null });
      } catch (error) {
         toast.error(error.response?.data?.message || "An error occurred during logout");
      }
   },

   checkAuth: async () => {
      set({ checkingAuth: true });
      try {
         const res = await axios.get("/auth/profile");
         set({ user: res.data, checkingAuth: false });
      } catch (error) {
         console.log(error.message);
         set({ checkingAuth: false, user: null });
      }
   },

   refreshToken: async () => {
      // prevents multiple simultaneous refresh attempts
      console.log("get().checkingAuth : ", get().checkingAuth);
      // if (get().checkingAuth) return;
      console.log("Refreshing token...");

      set({ checkingAuth: true });
      console.log("set checkingAuth to true: ", get().checkingAuth);
      try {
         const res = await axios.post("/auth/refresh-token");
         set({ checkingAuth: false });
         console.log("Refresh token successful");
         return res.data;
      } catch (error) {
         set({ user: null, checkingAuth: false });
         console.log("Refresh token failed");
         throw error;
      }
   },
}));

// axios interceptor for token refresh
function getAccessTokenFromCookies() {
   console.log("document.cookie: ", document.cookie);
   const cookie = document.cookie.split(";").find((row) => row.startsWith("accessToken"));

   console.log("cookie: ", cookie);

   return cookie ? cookie.split("=")[1] : null;
}

// axios.interceptors.request.use(
//    (request) => {
//       const accessToken = getAccessTokenFromCookies();
//       console.log("interceptors request: accessToken is ", accessToken);

//       if (accessToken) {
//          request.headers["Authorization"] = `Bearer ${accessToken}`;
//       }

//       return request;
//    },
//    (error) => Promise.reject(error)
// );

let refreshPromise = null;

axios.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;
      console.log("error.config is ", error.config);
      console.log("originalRequest._retry is ", originalRequest?._retry);
      if (error.response?.status === 401 && !originalRequest?._retry) {
         try {
            // if a refresh token is already in progress, wait for it to complete
            if (refreshPromise) {
               console.log("Refresh promise exists");
               console.log(useUser.getState().checkingAuth);
               useUser.setState({ checkingAuth: false });
               await refreshPromise;
               console.log("refreshing promise");
               console.log(useUser.getState().checkingAuth);

               // return axios(originalRequest);
            } else {
               // else, start a new refresh process
               console.log("Refreshing token (interceptors)");
               refreshPromise = useUser.getState().refreshToken();
               await refreshPromise;
               console.log("Refresh promise: ", refreshPromise);
               // refreshPromies = null;
               console.log("Token refreshed (interceptors)");
            }

            originalRequest._retry = true;
            return axios(originalRequest);
         } catch (refreshError) {
            // if refresh fails, redirect user to login or handle as needed
            console.log("Token is not refreshed");
            useUser.getState().logout();
            return Promise.reject(refreshError);
         } finally {
            refreshPromise = null;
         }
      }
      console.log("error.response.status is not 401 or originalRequest._retry is true");
      return Promise.reject(error);
   }
);
