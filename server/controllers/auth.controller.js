import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

function generateTokens(userId) {
   const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
   const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "90d" });

   return { accessToken, refreshToken };
}

async function storeSessionId(sessionId, refreshToken) {
   await redis.set(`session_id: ${sessionId}`, refreshToken, "EX", 60 * 60 * 24 * 30 * 3);
}

async function setCookies(res, accessToken, sessionId) {
   res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
   });
   res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
   });
}

export async function sendOtp(req, res) {
   const { phone } = req.body;

   if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
   }

   try {
      const payload = {
         phone,
         gateway_key: process.env.OTP_GATEWAY_KEY,
      };

      const response = await fetch(`${process.env.OTP_BASE_URL}/v1/otp/request`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OTP_MERCHANT_KEY}`,
         },
         body: JSON.stringify(payload),
      });

      // response.json().then((body) => {
      //    if (body.status) {
      //       res.json({ otp_id: body.data.id });
      //    } else {
      //       res.status(400).json({ message: "Failed sending OTP" });
      //    }
      // });

      const body = await response.json();
      if (body.status) {
         res.json({ otp_id: body.data.id });
      } else {
         res.status(400).json({ message: "Failed sendint OTP" });
      }
   } catch (error) {
      console.log("Error in sendOtp controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function login(req, res) {
   const { otp_id, otp, phone } = req.body;
   const sessionId = uuid();

   if (!otp_id || !otp) {
      return res.status(400).json({ message: "OTP is required" });
   }

   try {
      const payload = {
         otp_id,
         otp,
      };

      // validate otp
      const response = await fetch(`${process.env.OTP_BASE_URL}/v1/otp/verify`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${process.env.OTP_MERCHANT_KEY}`,
         },
         body: JSON.stringify(payload),
      });

      // login or register
      // response.json().then(async (body) => {
      //    if (body.status) {
      //       const userExists = await User.findOne({ phone });

      //       if (!userExists) {
      //          await User.create({ phone });
      //          res.status(201);
      //       }

      //       const user = await User.findOne({ phone });

      //       const { accessToken, refreshToken } = generateTokens(user._id);
      //       await storeSessionId(sessionId, refreshToken);
      //       setCookies(res, accessToken, sessionId);

      //       // req.user = user;
      //       res.json(user);
      //    } else {
      //       res.status(400).json({ message: body.message });
      //    }
      // });

      const body = await response.json();
      if (body.status) {
         // const userExists = await User.findOne({ phone });

         // if (!userExists) {
         //    await User.create({ phone });
         //    res.status(201);
         // }

         // const user = await User.findOne({ phone });
         const user = await User.findOne({ phone });

         if (!user) {
            await User.create({ phone });
            res.status(201);
         }

         const { accessToken, refreshToken } = generateTokens(user._id);
         await storeSessionId(sessionId, refreshToken);
         setCookies(res, accessToken, sessionId);

         // req.user = user;
         res.json(user);
      } else {
         res.status(400).json({ message: body.message });
      }
   } catch (error) {
      console.log("Error in loginController ", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function logout(req, res) {
   try {
      const sessionId = req.cookies.sessionId;
      if (sessionId) {
         await redis.del(`session_id: ${sessionId}`);
      }
      res.clearCookie("accessToken");
      res.clearCookie("sessionId");
      res.json({ message: "Logged out successfully" });
   } catch (error) {
      console.log("Error in logoutController", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function refreshToken(req, res) {
   try {
      const sessionId = req.cookies.sessionId;
      if (!sessionId) {
         console.log("No session id (!sessionId)");
         return res.status(401).json({ message: "No session id found" });
      }

      const storedToken = await redis.get(`session_id: ${sessionId}`);

      if (!storedToken) {
         console.log("Invalid session");
         return res.status(401).json({ message: "Invalid session" });
      }

      const decoded = jwt.verify(storedToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

      res.cookie("accessToken", accessToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 15 * 60 * 1000,
      });

      res.json({ message: "Token refreshed successfully" });
   } catch (error) {
      console.log("Error in refreshToken controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export async function getProfile(req, res) {
   try {
      res.json(req.user);
   } catch (error) {
      console.log("Error in getProfile controller", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}
