"use client";

import Image from "next/image";
import Link from "next/link";
import { deleteProperty } from "@/app/actions/deleteproperty";
import { useState } from "react";

const UserProfileProperty = ({ userProperties }) => {
const [properties, setProperties] = useState(userProperties);

const handleDelete = async(propertyId)=>{
  const confirmdelete = window.confirm("Are you sure you want to delete this property?");
  if(!confirmdelete) return;
  await deleteProperty(propertyId);
  const updatedProperties = properties.filter(p=>p._id !==propertyId);
  setProperties(updatedProperties);
}

  return userProperties.map((property, index) => (
    <div className="mb-10" key={index}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={property.title}
          width={1000}
          height={200}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address: {property.location.street} {property.location.city}{" "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={()=>handleDelete(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default UserProfileProperty;
