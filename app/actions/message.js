"use server";
import ConnectDB from "@/config/connected";
import { GetSessionUser } from "@/utils/getsessionuser";
import Message from "@/models/message.model";

async function messageProperty(formdata) {
  await ConnectDB();
  const sessionUser = await GetSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }
  const { userId } = sessionUser;
  const receiverId = formdata.get("receiver");

  if (receiverId === userId) {
    throw new Error("You cannot send a message to yourself");
  }

  const messageData = {
    name: formdata.get("name"),
    email: formdata.get("email"),
    number: formdata.get("number"),
    body: formdata.get("body"),
    sender: userId,
    receiverId,
    property: formdata.get("propertyId"),
  };

  const message = new Message(messageData);
  await message.save();

  return { submitted: true };
}

export { messageProperty };