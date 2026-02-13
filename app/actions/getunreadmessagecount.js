"use server";

import { GetSessionUser } from "@/utils/getsessionuser";
import ConnectDB from "@/config/connected";
import Message from "@/models/message.model";

export async function getUnreadMessageCount() {
  await ConnectDB();

  const sessionUser = await GetSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments(
    {
        receiver: userId,
        read: false
    }
  )

  return {count}

  
}
