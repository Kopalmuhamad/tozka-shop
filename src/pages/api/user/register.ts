import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "https://tozka-shop.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const status = await signUp(req.body);
      if (status) {
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "Success" });
      } else {
        res
          .status(400)
          .json({ status: false, statusCode: 400, message: "Failed" });
      }
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      });
    }
  } else {
    res
      .status(405)
      .json({ status: false, statusCode: 405, message: "Method Not Allowed" });
  }
}
