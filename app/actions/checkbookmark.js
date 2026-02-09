"use server";

import { GetSessionUser } from "@/utils/getsessionuser";
import ConnectDB from "@/config/connected";
import User from "@/models/user.model";

export async function CheckBookmark(propertyId) {
  await ConnectDB();

  const sessionUser = await GetSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  let isBookmarked = user.bookmarks.includes(propertyId);
  return {isBookmarked}
}
