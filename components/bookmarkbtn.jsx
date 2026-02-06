"use client";
import { BookMark } from "@/app/actions/bookmarkproperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

const BookMarkButton = ({ propertyId  }) => {
    console.log("propertyId in bookmarkbtn", propertyId);
  const { data: session } = useSession();

  const handleclick = async () => {
    if (!session) {
      toast.error("You must be logged in to bookmark a property");
    } else {
      try {
        const result = await BookMark(propertyId);
        toast.success(result.message);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleclick}
    >
      <FaBookmark  className=" mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookMarkButton;
