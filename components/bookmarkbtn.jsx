"use client";
import { BookMark } from "@/app/actions/bookmarkproperty";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { CheckBookmark } from "@/app/actions/checkbookmark";

const BookMarkButton = ({ propertyId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  console.log("session", session)
  const userId = session?.user?.id
  console.log("userId", userId)

  useEffect(()=>{

    if(!userId){
      setLoading(false);
      return;
    };

    CheckBookmark(propertyId).then((res)=>{
      if(res.error) toast.error(res.error);
      if(res.isBookmarked) setIsBookmarked(res.isBookmarked)
      setLoading(false);
    })


  },[propertyId, CheckBookmark,userId ])

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

  if(loading){
    return <p className="text-center">Loading...</p>
  }

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
