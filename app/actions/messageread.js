"use server";

import { GetSessionUser } from "@/utils/getsessionuser";
import ConnectDB from "@/config/connected";
import Message from "@/models/message.model";
import { revalidatePath } from "next/cache";

export async function MessageRead(messageId) {
  await ConnectDB();

  const sessionUser = await GetSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.receiver.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();
  return message.read;
}
