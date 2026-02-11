import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please fill the name"],
    },
    email: {
      type: String,
      required: [true, "Please fill the email address"],
    },
    number: {
      type: Number,
      required: [true, "Please fill the phone number"],
    },
    body: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true },
);

// ⭐ IMPORTANT ⭐
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
