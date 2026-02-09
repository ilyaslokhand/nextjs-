"use client";
import { BookMark } from "@/app/actions/bookmarkproperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

const BookMarkButton = ({ propertyId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleclick = async () => {
    if (!session) {
      toast.error("You must be logged in to bookmark a property");
    } else {
      try {
        const result = await BookMark(propertyId);
        setIsBookmarked((prev) => !prev);
        toast.success(result.message);
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      {isBookmarked ? (
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          onClick={handleclick}
        >
          <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
          onClick={handleclick}
        >
          <FaBookmark className="mr-2" /> Bookmark Property
        </button>
      )}
    </>
  );
};

export default BookMarkButton;
