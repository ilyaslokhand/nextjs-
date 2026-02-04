'use server'
import cloudinary from "@/config/cloudinary";
import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import { GetSessionUser } from "@/utils/getsessionuser";
import { revalidatePath } from "next/cache";

export async function deleteProperty(propertyId){
    await ConnectDB();
    const sessionUser = await GetSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error( 'user id is required')
    }
    const {userId} = sessionUser;

    // find the property owns by user

    const property = await Property.findById(propertyId);

    if(!property){
        throw new Error('Property Not Found')
    };

    if(property.owner.toString() !==userId){
        throw new Error(' You are not authorized to delete this property')
    }

     // extract public id from cloudinary url

    const publicIds = property.images.map((imageurl)=>{
        const parts = imageurl.split('/');
        return parts.at(-1).split('.').at(0);
    })

    // delete images from cloudinary

    if(publicIds.length>0){
        for (let publicId of publicIds ){
            await cloudinary.uploader.destroy('PropertyPulse/'+ publicId )
        }
    }


    await property.deleteOne();

    revalidatePath('/', 'layout')

}