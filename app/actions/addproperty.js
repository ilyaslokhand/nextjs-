"use server";
import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import { GetSessionUser } from "@/utils/getsessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formdata) {
  await ConnectDB();
  const sessionUser = await GetSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;

  const Amenities = formdata.getAll("amenities");
  const images = formdata.getAll("images").filter((image) => image.name !== "");
  const propertyData = {
    owner: userId,
    type: formdata.get("type"),
    name: formdata.get("name"),
    discription: formdata.get("description"),

    location: {
      street: formdata.get("location.street"),
      city: formdata.get("location.city"),
      state: formdata.get("location.state"),
      zipcode: formdata.get("location.zipcode"),
    },
    beds: formdata.get("beds"),
    baths: formdata.get("baths"),
    squarefeet: formdata.get("square_feet"),
    amenities: Amenities,
    rates: {
      weekly: formdata.get("rates.weekly"),
      monthly: formdata.get("rates.monthly"),
      nightly: formdata.get("rates.nightly"),
    },

    sellerinfo: {
      name: formdata.get("seller_info.name"),
      email: formdata.get("seller_info.email"),
      phone: formdata.get("seller_info.phone"),
    },
  };

  const imageUrls = await Promise.all(
    images.map(async (imageFile) => {
      // Convert image to buffer
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      // Convert buffer to base64
      const base64Image = buffer.toString("base64");

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${base64Image}`,
        {
          folder: "PropertyPulse",
        },
      );

      return result.secure_url;
    }),
  );

  propertyData.images = imageUrls;
  const newProperty = new Property(propertyData);
  await newProperty.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
