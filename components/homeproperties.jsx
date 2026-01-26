import porperties from "@/properties.json";
import PropertyCard from "@/components/propertycard";
import Link from "next/link";
import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";

const HomeProperty = async () => {
  await ConnectDB();

  const recentProperties = await Property.find({})
    .sort({ createdAt: 1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className="px-4 py-6">
        <div className="px-4 py-6 container-xl lg:container mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Recent Properties
          </h2>
          {porperties.length === 0 ? (
            <p>no properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property) => (
                <PropertyCard property={property} key={property._id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="m-auto max-w-lg py-10 px-6">
        <Link
          href="/properties"
          className="text-center bg-black text-white px-6 py-4 rounded-xl w-full block hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperty;
