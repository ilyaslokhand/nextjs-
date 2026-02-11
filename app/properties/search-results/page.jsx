import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import Link from "next/link";
import PropertyCard from "@/components/propertycard";
import PropertySearchForm from "@/components/propertysearchform";
import { FaArrowCircleLeft } from "react-icons/fa";
import { ConvertToSerializedObject } from "@/utils/converttoobject";

const SearchResults = async (props) => {
  const searchParams = await props.searchParams;

  const location = searchParams?.location || "";
  const propertyType = searchParams?.propertyType || "All";

  await ConnectDB();

  // if any of the query matches, we will get the property

  let query = {};

  // ✅ Location filter (sirf tab jab location ho)
  if (location && location.trim() !== "") {
    const locationPattern = new RegExp(location, "i");

    query.$or = [
      { name: locationPattern },
      { discription: locationPattern }, // DB ke exact naam ke saath
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ];
  }

  // ✅ Property type filter
  if (propertyType && propertyType !== "All") {
    query.type = propertyType; // regex ki bhi zarurat nahi
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = ConvertToSerializedObject(propertiesQueryResults);


  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 items-start">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6 ">
          <Link
            href="/properties"
            className="flex items-center text-blue-600 hover:underline"
          >
            <FaArrowCircleLeft className="mr-2" />
            Back to all properties
          </Link>
          <h1 className="text-2xl font-bold mb-4">search results</h1>
          {properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No properties found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
