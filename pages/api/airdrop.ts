// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb, admin } from "../../firebaseAdmin"; // Adjust the path according to your setup

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { wallet, tweet } = req.body;

  if (!wallet) {
    return res.status(400).json({ error: "Wallet is required" });
  }

  try {
    await adminDb.collection("subscribers").add({
      wallet: wallet,
      tweet: tweet,
      submit_time: admin.firestore.FieldValue.serverTimestamp(),
      ip: req.headers["x-real-ip"] || req.socket.remoteAddress,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding document:", error);
    return res
      .status(500)
      .json({ error: "Failed to subscribe. Please try again later." });
  }
}
