"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // 👉 Leaflet SSR support nahi karta Isliye map ko dynamic import + ssr:false se load karna padega

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;

        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(address)}`,
        );

        if (!res.ok) {
          throw new Error("Geocoding failed");
        }

        const data = await res.json();
        if (!data || data.length === 0) {
          setGeocodeError(true);
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setLat(lat);
        setLng(lng);
      } catch (err) {
        console.error(err);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);
  if (loading) return <h3>Loading...</h3>;
  if (geocodeError) return <h3>Unable to fetch map coordinates</h3>;

  return (
    <div style={{ height: "500px" }}>
      {lat && lng && <Map posix={[lat, lng]} />}
    </div>
  );
};

export default PropertyMap;
