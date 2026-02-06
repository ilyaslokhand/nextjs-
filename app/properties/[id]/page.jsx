import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import PropertyHeaderImage from "@/components/propertyheaderimage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyDetails from "@/components/propertydetails";
import PropertyImages from "@/components/PropertyImages";
import { ConvertToSerializedObject } from "@/utils/converttoobject";
import BookMarkButton from "@/components/bookmarkbtn";
import ShareButton from "@/components/sharebutton";
import PropertyContactForm from "@/components/propertycontactform";

const PropertyPage = async ({ params }) => {
  const { id } = await params;

  await ConnectDB();
  const PropertiesDocs = await Property.findById(id).lean();
  const propertyDetails = ConvertToSerializedObject(PropertiesDocs);

  if (!propertyDetails) {
    return (
      <h1 className="text-center text-2xl mt-10 font-bold">
        Property details not found
      </h1>
    );
  }

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
            <aside className="space-y-4">
              <BookMarkButton propertyId={propertyDetails._id}></BookMarkButton>
              <ShareButton />
              <PropertyContactForm />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={propertyDetails.images} />
    </>
  );
};

export default PropertyPage;
