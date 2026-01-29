"use server";

async function addProperty(formdata) {
  const Amenities = formdata.getAll("amenities");
  const images = formdata
    .getAll("images")
    .filter((image) => image.name !== "")
    .map((image) => image.name);
  const propertyData = {
    type: formdata.get("type"),
    name: formdata.get("name"),
    description: formdata.get("description"),
    location: {
      street: formdata.get("location.street"),
      city: formdata.get("location.city"),
      state: formdata.get("location.state"),
      zip: formdata.get("location.zipcode"),
    },
    beds: formdata.get("beds"),
    baths: formdata.get("baths"),
    area: formdata.get("square_feet"),

    rates: {
      Weekly: formdata.get("rates.weekly"),
      Monthly: formdata.get("rates.monthly"),
      nightly: formdata.get("rates.nightly"),
    },

    sellerinfo: {
      name: formdata.get("seller_info.name"),
      email: formdata.get("seller_info.email"),
      phone: formdata.get("seller_info.phone"),
    },
  };
  console.log({ ...propertyData, Amenities, images });
}

export default addProperty;
