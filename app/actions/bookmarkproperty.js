"use server"

import { GetSessionUser } from "@/utils/getsessionuser";
import ConnectDB from "@/config/connected";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";


export  async function BookMark (propertyId) {
    await ConnectDB();

    const sessionUser = await GetSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error("unauthorized");
    };

    const { userId } = sessionUser;
    const user = await User.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    let isBookmarked = user.bookmarks.includes(propertyId)

    let message;

    if(isBookmarked){
        user.bookmarks.pull(propertyId);
        message = 'Bookmark remove';
        isBookmarked = false;
    } else{
        user.bookmarks.push(propertyId);
        message = 'bookmark successfully'
        isBookmarked = true;
    }

    await user.save()
    revalidatePath('/properties/saved', 'page')
    return{
        message,
    }

}