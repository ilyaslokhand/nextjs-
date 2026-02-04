const AMENITIES = [
  "Wifi",
  "Full kitchen",
  "Washer & Dryer",
  "Free Parking",
  "Swimming Pool",
  "Hot Tub",
  "24/7 Security",
  "Wheelchair Accessible",
  "Elevator Access",
  "Dishwasher",
  "Gym/Fitness Center",
  "Air Conditioning",
  "Balcony/Patio",
  "Smart TV",
  "Coffee Maker",
];

const EditPropertyForm = ({ propertyDetails }) => {
  return (
    <form>
      <h2 className="text-3xl text-center font-semibold mb-6">Edit Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          defaultValue={propertyDetails.type}
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="CabinOrCottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
          defaultValue={propertyDetails.name}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded w-full py-2 px-3"
          rows="4"
          placeholder="Add an optional description of your property"
          defaultValue={propertyDetails.discription}
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          type="text"
          id="street"
          name="location.street"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
          defaultValue={propertyDetails.location.street}
        />
        <input
          type="text"
          id="city"
          name="location.city"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          defaultValue={propertyDetails.location.city}
          required
        />
        <input
          type="text"
          id="state"
          name="location.state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          defaultValue={propertyDetails.location.state}
          required
        />
        <input
          type="text"
          id="zipcode"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
          defaultValue={propertyDetails.location.zipcode}
        />
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            className="border rounded w-full py-2 px-3"
            defaultValue={propertyDetails.beds}
            required
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            name="baths"
            className="border rounded w-full py-2 px-3"
            defaultValue={propertyDetails.baths}
            required
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            className="border rounded w-full py-2 px-3"
            defaultValue={propertyDetails.squarefeet}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {AMENITIES.map((amenity) => (
          <label key={amenity} className="flex items-center">
            <input
              type="checkbox"
              name="amenities"
              value={amenity}
              className="mr-2"
              defaultChecked={propertyDetails.amenities?.includes(amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              name="rates.weekly"
              className="border rounded w-full py-2 px-3"
              defaultValue={propertyDetails.rates.weekly}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              name="rates.monthly"
              className="border rounded w-full py-2 px-3"
              defaultValue={propertyDetails.rates.monthly}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              name="rates.nightly"
              className="border rounded w-full py-2 px-3"
              defaultValue={propertyDetails.rates.nightly}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          name="seller_info.name"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
          defaultValue={propertyDetails.seller_info.name}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          name="seller_info.email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          defaultValue={propertyDetails.seller_info.email}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          name="seller_info.phone"
          className="border rounded w-full py-2 px-3"
          defaultValue={propertyDetails.seller_info.phone}
          placeholder="Phone"
        />
      </div>


      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Property
        </button>
      </div>
    </form>
  );
};

export default EditPropertyForm;
