import ConnectDB from "@/config/connected";
import { GetSessionUser } from "@/utils/getsessionuser";
import User from "@/models/user.model";
import PropertyCard from "@/components/propertycard";
import Property from "@/models/property.model";

const SavedPropertyPage = async () => {
  await ConnectDB();
  const sessionUser = await GetSessionUser();
  const { userId } = sessionUser;
  if (!userId) {
    throw new Error("User Id is required");
  }

  const user = await User.findById(userId).populate("bookmarks");

  const bookmarkedProperties = user.bookmarks;

  return (
    <section className="py-6 px-4">
      <div className="container m-auto px-2.5 py-5">
        {bookmarkedProperties.length == 0 ? (
          <p className="text-center text-gray-500">
            You have no saved properties.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarkedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertyPage;
