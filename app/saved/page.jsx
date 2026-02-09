import ConnectDB from "@/config/connected";
import { GetSessionUser } from "@/utils/getsessionuser";
import User from "@/models/user.model";

const SavedPropertyPage = async () => {

    await ConnectDB();
    const sessionUser = await GetSessionUser();
    const { userId} = sessionUser;
    if(!userId){
        throw new Error("User Id is required");
    };
    

  return <div className="py-10 text-center">Saved Property Page</div>;
};

export default SavedPropertyPage;
