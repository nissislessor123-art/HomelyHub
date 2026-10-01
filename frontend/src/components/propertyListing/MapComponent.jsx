import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Fix Leaflet marker icons in Vite/React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const properNames = {
  himachalpradesh: "Himachal Pradesh",
  tamilnadu: "Tamil Nadu",
  westbengal: "West Bengal",
  madhyapradesh: "Madhya Pradesh",
  andhrapradesh: "Andhra Pradesh",
  uttarpradesh: "Uttar Pradesh",
  alleppey: "Alappuzha",
  pondicherry: "Puducherry",
};

const normalizeName = (value) => {
  if (!value) return "";

  const clean = String(value).trim();
  const key = clean.toLowerCase().replace(/\s+/g, "");

  return properNames[key] || clean;
};

const MapCenterUpdater = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.length === 2) {
      map.setView(coordinates, 16);
    }
  }, [coordinates, map]);

  return null;
};

const MapComponent = ({ address = {} }) => {
  const area = normalizeName(address.area);
  const city = normalizeName(address.city);
  const state = normalizeName(address.state);
  const pincode = String(address.pincode || "").trim();

  const place = useMemo(() => {
    return [area, city, state, pincode, "India"]
      .filter(Boolean)
      .join(", ");
  }, [area, city, state, pincode]);

  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCoordinates = async () => {
      setLoading(true);
      setError("");
      setCoordinates(null);

      try {
        // Search the FULL property address only.
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=in&addressdetails=1&q=${encodeURIComponent(
            place
          )}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Geocoding request failed");
        }

        const data = await response.json();

        if (!isMounted) return;

        if (data.length > 0) {
          const latitude = Number(data[0].lat);
          const longitude = Number(data[0].lon);

          if (
            Number.isFinite(latitude) &&
            Number.isFinite(longitude)
          ) {
            setCoordinates([latitude, longitude]);
          } else {
            setError("Could not determine the exact map location.");
          }
        } else {
          setError(
            "Exact map location could not be found for this address."
          );
        }
      } catch (err) {
        console.error("Geocoding error:", err);

        if (isMounted) {
          setError("Map is not available right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (place && place !== "India") {
      fetchCoordinates();
    } else {
      setLoading(false);
      setError("Property address is incomplete.");
    }

    return () => {
      isMounted = false;
    };
  }, [place]);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place
  )}`;

  return (
    <div className="w-full">
      <div className="mb-3">
        <p className="text-sm font-semibold text-[#19333c]">
          {place}
        </p>
      </div>

      {loading && (
        <div className="flex h-[320px] items-center justify-center rounded-xl bg-[#f4f8f7] text-sm text-[#71878d]">
          Finding property location...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl bg-[#f4f8f7] p-5 text-sm text-[#71878d]">
          <p>{error}</p>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex rounded-lg bg-[#0abab5] px-4 py-2 font-bold text-[#06232d]"
          >
            Open location in Google Maps
          </a>
        </div>
      )}

      {!loading && !error && coordinates && (
        <>
          <MapContainer
            center={coordinates}
            zoom={16}
            scrollWheelZoom={true}
            style={{
              height: "320px",
              width: "100%",
              borderRadius: "12px",
            }}
          >
            <MapCenterUpdater coordinates={coordinates} />

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={coordinates}>
              <Popup>{place}</Popup>
            </Marker>
          </MapContainer>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-bold text-[#087c7a] hover:underline"
          >
            Open this location in Google Maps →
          </a>
        </>
      )}
    </div>
  );
};

export default MapComponent;
