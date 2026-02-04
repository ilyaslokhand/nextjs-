'use server';
import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import { GetSessionUser } from "@/utils/getsessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


async function updateProperty(formdata, propertyId) {
    await ConnectDB();
}