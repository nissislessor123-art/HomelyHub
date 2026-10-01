import React from "react";

const initialamenities = [
  {
    id: "wifi",
    label: "WiFi",
    value: "Wifi",
    checked: false,
    icon: "wifi",
  },
  {
    id: "kitchen",
    label: "Kitchen",
    value: "kitchen",
    checked: false,
    icon: "kitchen",
  },
  {
    id: "parking",
    label: "Free Parking",
    value: "Free Parking",
    checked: false,
    icon: "garage_home",
  },
  {
    id: "washingmachine",
    label: "Washing Machine",
    value: "Waching machine",
    checked: false,
    icon: "local_laundry_service",
  },
  {
    id: "tv",
    label: "TV",
    value: "Tv",
    checked: false,
    icon: "tv",
  },
  {
    id: "pool",
    label: "Pool",
    value: "pool",
    checked: false,
    icon: "pool",
  },
  {
    id: "ac",
    label: "AC",
    value: "Ac",
    checked: false,
    icon: "air",
  },
];

const AmenitiesField = ({ form }) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <form.Field name="amenities">
        {(field) => (
          <>
            {initialamenities.map((amenity) => {
              const selected = (
                field.state.value || []
              ).some(
                (item) =>
                  item.name === amenity.value
              );

              return (
                <label
                  key={amenity.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    selected
                      ? "border-[#0abab5] bg-[#e8f8f6] text-[#087c7a]"
                      : "border-[#dfe8e7] bg-white text-[#60767a] hover:border-[#9ed9d6]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    className="h-4 w-4 accent-[#0abab5]"
                    onChange={(e) => {
                      const isChecked =
                        e.target.checked;

                      const currentAmenities =
                        field.state.value || [];

                      if (isChecked) {
                        field.handleChange([
                          ...currentAmenities,
                          {
                            name: amenity.value,
                            icon: amenity.icon,
                          },
                        ]);
                      } else {
                        field.handleChange(
                          currentAmenities.filter(
                            (item) =>
                              item.name !==
                              amenity.value
                          )
                        );
                      }
                    }}
                  />

                  <span className="material-symbols-outlined text-[18px]">
                    {amenity.icon}
                  </span>

                  <span className="text-sm font-semibold">
                    {amenity.label}
                  </span>
                </label>
              );
            })}
          </>
        )}
      </form.Field>
    </div>
  );
};

export default AmenitiesField;