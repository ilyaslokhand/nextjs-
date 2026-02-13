"use server";

import ConnectDB from "@/config/connected";
import { GetSessionUser } from "@/utils/getsessionuser";
import Message from "@/models/message.model";

async function messageProperty(prevstate, formdata) {
  await ConnectDB();

  const sessionUser = await GetSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;
  const receiver = formdata.get("receiver");

  if (receiver === userId) {
    throw new Error("You cannot send a message to yourself");
  }

  const messageData = {
    name: formdata.get("name"),
    email: formdata.get("email"),
    number: formdata.get("number"), // string
    body: formdata.get("body"),
    sender: userId,
    receiver,
    property: formdata.get("property"), // ✅ fixed
  };

  const message = new Message(messageData);
  await message.save();

  return { submitted: true };
}

export { messageProperty };
