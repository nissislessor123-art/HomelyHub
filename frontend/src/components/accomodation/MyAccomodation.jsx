import React from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyAccomodation = ({ accomodation = [] }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {accomodation.map((place) => {
        const image =
          place.images?.[0]?.url ||
          place.images?.[0] ||
          "/assets/default-property.jpg";

        const propertyName =
          place.propertyName ||
          place.propertyname ||
          "HomelyHub stay";

        const city =
          place.address?.city ||
          place.address?.area ||
          "Location unavailable";

        const state = place.address?.state || "";

        const price = Number(place.price || 0);

        return (
          <article
            key={place._id}
            className="group overflow-hidden rounded-[22px] border border-[#dfe8e7] bg-white shadow-[0_8px_28px_rgba(25,51,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(25,51,60,0.10)]"
          >
            {/* IMAGE */}
            <div className="relative aspect-[1.2] overflow-hidden bg-[#edf3f2]">
              <img
                src={image}
                alt={propertyName}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#087c7a] shadow-sm backdrop-blur">
                Your listing
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h3 className="line-clamp-1 text-lg font-extrabold tracking-[-0.02em] text-[#19333c]">
                {propertyName}
              </h3>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-[#718589]">
                <MapPin
                  size={14}
                  className="shrink-0 text-[#0abab5]"
                />
                <span className="truncate">
                  {city}
                  {state ? `, ${state}` : ""}
                </span>
              </p>

              {/* STAY TIMES */}
              <div className="mt-4 grid grid-cols-2 gap-2">

                <div className="rounded-xl bg-[#f6faf9] p-3">
                  <div className="flex items-center gap-1.5 text-[#8b9c9f]">
                    <Clock3 size={13} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em]">
                      Check-in
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-bold text-[#19333c]">
                    {place.checkInTime || "—"}
                  </p>
                </div>

                <div className="rounded-xl bg-[#f6faf9] p-3">
                  <div className="flex items-center gap-1.5 text-[#8b9c9f]">
                    <Clock3 size={13} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em]">
                      Check-out
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs font-bold text-[#19333c]">
                    {place.checkOutTime || "—"}
                  </p>
                </div>

              </div>

              {/* DETAILS */}
              <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-[#f6faf9] p-3">

                <div className="flex items-center gap-2">
                  <Users
                    size={14}
                    className="text-[#0abab5]"
                  />

                  <span className="text-xs font-semibold text-[#60767a]">
                    Up to {place.maximumGuest || 0} guests
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <WalletCards
                    size={14}
                    className="text-[#0abab5]"
                  />

                  <span className="text-sm font-extrabold text-[#19333c]">
                    ₹{price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-[10px] text-[#8b9c9f]">
                    / night
                  </span>
                </div>

              </div>

              {/* ACTION */}
              <Link
                to={`/propertylist/${place._id}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8e5e4] px-4 py-3 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:bg-[#f2faf9] hover:text-[#087c7a]"
              >
                View stay
                <ArrowRight size={15} />
              </Link>

            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MyAccomodation;