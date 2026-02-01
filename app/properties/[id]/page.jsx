import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import PropertyHeaderImage from "@/components/propertyheaderimage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/propertydetails";
import PropertyImages from "@/components/PropertyImages";

const PropertyPage = async ({ params }) => {
  const { id } = await params;

  await ConnectDB();
  const propertyDetails = await Property.findById(id).lean();

  return (
    <>
      <PropertyHeaderImage image={propertyDetails.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas  mr-2"></FaArrowLeft> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 ">
          <div className="grid-base grid-70-30 gap-6">
            <PropertyDetails property={propertyDetails} />
          </div>
        </div>
      </section>
      <PropertyImages images={propertyDetails.images} />
    </>
  );
};

export default PropertyPage;
