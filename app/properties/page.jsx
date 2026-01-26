import ConnectDB from "@/config/connected";
import Property from "@/models/property.model";
import PropertyCard from "@/components/propertycard";

const PropertiesPage = async () => {
   await ConnectDB();
    const properties = await Property.find({}).lean();
    return ( 
        <section className="px-4 py-6">
        <div className="px-4 py-6 container-xl lg:container mx-auto">
         { properties.length===0 ? (
          <p>no properties found</p>
         ):(
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property)=>(
                <PropertyCard property={property} key={property._id}/>
            ) )}
            </div>
         ) }
        </div>
        </section>
     );
}
 
export default PropertiesPage;