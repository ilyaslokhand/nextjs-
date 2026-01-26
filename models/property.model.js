import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: true, // 👈 typo fix
    },
    baths: {
      type: Number,
      required: true,
    },
    squarefeet: {
      type: Number,
      required: true,
    },
    amenities: [String],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ⭐ IMPORTANT LINE ⭐
const Property =
  mongoose.models.Property ||
  mongoose.model("Property", propertySchema);

export default Property;
