import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import PropertyCard from "@/components/propertycard";
import Pagination from "@/components/pagination";

const PropertiesPage = async ({ searchParams }) => {
  await ConnectDB();
  const params = await searchParams; // 👈 unwrap the Promise

  const page = parseInt(params?.page || "1");
  const pageSize = parseInt(params?.pageSize || "2");

  const skip = (page - 1) * pageSize; // Calculate the number of documents to skip based on the current page and page size
  const total = await Property.countDocuments(); // Get the total number of properties in the database

  const properties = await Property.find({}).skip(skip).limit(pageSize);
  return (
    <section className="px-4 py-6">
      <div className="px-4 py-6 container-xl lg:container mx-auto">
        {properties.length === 0 ? (
          <p>no properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
      <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />
    </section>
  );
};

export default PropertiesPage;
