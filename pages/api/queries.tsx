import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  solution: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { inputText, chatId, model, session } = req.body;

  if (!inputText) {
    res.status(400).json({ solution: "Please provide a input." });
    return;
  }

  if (!chatId) {
    res.status(400).json({ solution: "Please provide a valid chat ID." });
    return;
  }

  const response = await query(inputText, chatId, model);

  const message: Message = {
    text: response || "ChatGPT was unable to find the solution for that.",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "/ChatGPTLogo.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ solution: message.text });
}
