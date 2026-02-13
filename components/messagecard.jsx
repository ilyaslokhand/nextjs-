"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { MessageRead } from "@/app/actions/messageread";
import { DeleteMessage } from "@/app/actions/deletemessage";
import { useGlobalContext } from "@/context/globalcontext";

const MessageCard = ({ message }) => {
  const { setunreadCount } = useGlobalContext();
  const [isRead, setisRead] = useState(message.read);
  const [isDeleted, setisDeleted] = useState(false);

  const handleDeleteClick = async () => {
    await DeleteMessage(message._id);
    toast.success("Message deleted successfully");
    setisDeleted(true);
    setunreadCount((prevCount)=> isRead? prevCount: prevCount-1 )
  };

  if (isDeleted) {
    return <p>Deleted Message</p>;
  }

  const handleReadClick = async () => {
    const readMessage = await MessageRead(message._id);
    setisRead(readMessage);
    setunreadCount((prevCount)=> readMessage? prevCount-1: prevCount+1 )
    toast.success(`Message marked as ${readMessage ? "read" : "unread"}`);
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md flex flex-col gap-4 border-gray-200">
      {!isRead && (
        <span className="absolute top-2 right-2 bg-yellow-500 text-white rounded-md p-2">
          New
        </span>
      )}
      <h2 className="text-xl ">
        <span className="font-bold">Property Inquiery</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700 ">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone</strong>{" "}
          <a href={`tel:${message.number}`} className="text-blue-500">
            {message.number}
          </a>
        </li>
        <li>
          <strong>Recieved Data</strong>{" "}
          {new Date(message.createdAt).toISOString()}
        </li>
      </ul>
      <div>
        <button
          className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md cursor-pointer"
          onClick={handleReadClick}
        >
          {isRead ? "Mark as new" : "Mark as read"}
        </button>
        <button
          className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
