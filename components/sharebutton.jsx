'use client';

import { FacebookShareButton, EmailShareButton, LinkedinShareButton,WhatsappShareButton } from "react-share";



const ShareButton = () => {

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${Property._id}`;

  return (
    <>
    <h3 className="font-bold text-center pt-2.5 text-xl"> Share this property</h3>
    <div className="flex justify-center gap-3 pb-5">
      <FacebookShareButton url={shareUrl} quote={Property.name}></FacebookShareButton>
    </div>
    </>
  );
};

export default ShareButton;
