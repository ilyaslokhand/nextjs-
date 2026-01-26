import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Please fill the email address"],
    },
    username: {
      type: String,
      required: [true, "Please fill the username"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

// ⭐ IMPORTANT ⭐
const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;
