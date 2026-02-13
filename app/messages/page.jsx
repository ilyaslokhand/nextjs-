import ConnectDB from "@/config/connected";
import Message from "@/models/message.model";
import { GetSessionUser } from "@/utils/getsessionuser";
import { ConvertToSerializedObject } from "@/utils/converttoobject";

const MessagesPage = async () => {
  await ConnectDB();

  const { userId } = await GetSessionUser();

  const readMessages = await Message.find({
    // “Is user ke read ho chuke messages lao.”
    receiver: userId,
    read: true,
  })
    .sort({ createdAt: -1 }) // Ye messages ko time ke hisaab se arrange karta hai.
    .populate("sender", "username") // aur sender aur property ka naam bhi saath me la raha hai.
    .populate("property", "name")
    .lean(); // lean() se data simple JavaScript object me milta hai, jisse hum easily use kar sakte hain.

  const unreadMessages = await Message.find({
    receiver: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = ConvertToSerializedObject(messageDoc);
    message.sender = ConvertToSerializedObject(messageDoc.sender);
    message.property = ConvertToSerializedObject(messageDoc.property);
    return message;
  }); // Ye dono read aur unread messages ko ek saath la raha hai, aur unko simple JavaScript objects me convert kar raha hai.

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto py-24 max-w-6xl">
        <div className="bg-white px-4 py-6 mb-4 shadow rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">You have no messages.</p>
            ) : (
              messages.map((message) => (
                <h3 key={message._id}>{message.name}</h3>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
