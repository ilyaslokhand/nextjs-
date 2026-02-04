import AddPropertyForm from "@/components/addpropertyform";

const AddPropertyPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="max-w-2xl mx-auto py-24 container ">
        <div className="bg-white px-6 py-6 mb-4 border m-4 shadow-md rounded-md md:m-0">
          <AddPropertyForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
