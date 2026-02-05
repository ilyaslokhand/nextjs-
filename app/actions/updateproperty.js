"use server";
import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import { GetSessionUser } from "@/utils/getsessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProperty(propertyId, formdata) {
  await ConnectDB();
  const sessionUser = await GetSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("unauthorized");
  }

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);

  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user does not own this property");
  }

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
    amenities: formdata.getAll("amenities"),
    rates: {
      weekly: formdata.get("rates.weekly"),
      monthly: formdata.get("rates.monthly"),
      nightly: formdata.get("rates.nightly"),
    },

    seller_info: {
      name: formdata.get("seller_info.name"),
      email: formdata.get("seller_info.email"),
      phone: formdata.get("seller_info.phone"),
    },
  };
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData,
  );
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
