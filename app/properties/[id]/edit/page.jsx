import EditPropertyForm from "@/components/editpropertyform";
import Property from "@/models/property.model";
import { ConvertToSerializedObject } from "@/utils/converttoobject";
import ConnectDB from "@/config/connected";


const PropertyEditPage = async ({ params }) => {
    await ConnectDB();
    const { id } = await params;
    const PropertiesDocs = await Property.findById(id).lean();
     if (!PropertiesDocs){
        return <h1 className="text-center text-2xl mt-10 font-bold">Property details not found</h1>;
      }
    const propertyDetails = ConvertToSerializedObject(PropertiesDocs)
     


    return ( 
        <section className="bg-blue-50">
        <div className="mx-auto container max-w-2xl py-24">
            <div className="bg-white px-6 py-8 shadow-md rounded-md mb-4 border m-4 md:m-0">
                <EditPropertyForm propertyDetails={propertyDetails} />
            </div>
        </div>
        </section>
     );
}
 
export default PropertyEditPage;