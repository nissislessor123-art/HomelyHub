import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Compass,
  Heart,
  House,
  Home as HomeIcon,
  Leaf,
  Coffee,
  MapPin,
  Search,
  Star,
  Sun,
  Waves,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllProperties } from "../store/Property/property-action";
import { propertyAction } from "../store/Property/property.slice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/User/User-Action";

const categories = [
  { label: "All stays", icon: Compass },
  { label: "Villas", icon: House },
  { label: "Apartments", icon: HomeIcon },
  { label: "Cabins", icon: Leaf },
  { label: "B&Bs", icon: Coffee },
  { label: "Resorts", icon: Waves },
  { label: "Heritage", icon: Sun },
];

const AllStays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties = [], loading } = useSelector(
    (state) => state.properties
  );

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [activeCategory, setActiveCategory] =
    useState("All stays");

  const [search, setSearch] = useState("");

 useEffect(() => {
  dispatch(propertyAction.updateSearchParams({ limit: 1000 }));
  dispatch(getAllProperties());
}, [dispatch]);

  const savedIds = useMemo(() => {
    return (user?.wishlist || []).map((item) =>
      typeof item === "object" ? item._id : item
    );
  }, [user]);

  const filtered = useMemo(() => {
    let result = properties;

    if (activeCategory !== "All stays") {
      const categoryMap = {
        Villas: ["villa"],
        Apartments: ["apartment", "flat"],
        Cabins: ["cabin"],
        "B&Bs": ["b&b", "bnb", "bed"],
        Resorts: ["resort"],
        Heritage: ["heritage"],
      };

      const keywords =
        categoryMap[activeCategory] || [];

      result = result.filter((property) => {
        const propertyType = String(
          property.propertyType ||
            property.roomType ||
            ""
        ).toLowerCase();

        return keywords.some((keyword) =>
          propertyType.includes(keyword)
        );
      });
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((property) => {
        const city = String(
          property.address?.city || ""
        ).toLowerCase();

        const area = String(
          property.address?.area || ""
        ).toLowerCase();

        const name = String(
          property.propertyName ||
            property.propertyname ||
            ""
        ).toLowerCase();

        return (
          city.includes(query) ||
          area.includes(query) ||
          name.includes(query)
        );
      });
    }

    return result;
  }, [
    activeCategory,
    properties,
    search,
  ]);

  const handleWishlist = (propertyId) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (savedIds.includes(propertyId)) {
      dispatch(removeFromWishlist(propertyId));
    } else {
      dispatch(addToWishlist(propertyId));
    }
  };

  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dfe7e8]/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold text-[#06232d]">
              hh
            </span>

            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
              HomelyHub
              <span className="text-[#0abab5]">.</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <Link
              to="/wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe7e8] transition hover:border-[#0abab5]"
            >
              <Heart size={18} />
            </Link>

            <Link
              to={
                isAuthenticated
                  ? "/profile"
                  : "/login"
              }
              className="rounded-full border border-[#dfe7e8] px-4 py-2 text-sm font-bold"
            >
              {isAuthenticated
                ? "Profile"
                : "Log in"}
            </Link>

          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-9 lg:px-8">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        <div className="mt-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Explore HomelyHub
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[#102d3a] sm:text-5xl">
            All stays
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
            Explore every available property in HomelyHub.
            Choose a category or search for a place.
          </p>

        </div>

        {/* SEARCH */}
        <div className="mt-8 flex max-w-[650px] items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-white px-4 py-3 shadow-[0_8px_25px_rgba(25,51,60,0.05)]">

          <Search
            size={18}
            className="text-[#0abab5]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by city, area or property name"
            className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-[#9baaad]"
          />

        </div>

        {/* CATEGORIES */}
        <div className="mt-7 flex gap-2 overflow-x-auto pb-2">

          {categories.map((category) => {
            const Icon = category.icon;

            const active =
              activeCategory === category.label;

            return (
              <button
                key={category.label}
                type="button"
                onClick={() =>
                  setActiveCategory(category.label)
                }
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "border-[#0abab5] bg-[#dff7f5] text-[#087c7a]"
                    : "border-[#dfe7e8] bg-white text-[#627980] hover:border-[#a9dedd]"
                }`}
              >
                <Icon size={16} />
                {category.label}
              </button>
            );
          })}

        </div>

        {/* COUNT */}
        <div className="mt-8 flex items-center justify-between">

          <p className="text-sm font-semibold text-[#71878d]">
            {loading
              ? "Finding stays..."
              : `${filtered.length} ${
                  filtered.length === 1
                    ? "stay"
                    : "stays"
                } found`}
          </p>

        </div>

        {/* PROPERTIES */}
        {loading ? (
          <div className="py-24 text-center text-sm font-semibold text-[#71878d]">
            Finding your stays...
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-[24px] border border-[#dfe8e7] bg-white py-20 text-center">
            <p className="text-lg font-extrabold">
              No stays found
            </p>

            <p className="mt-2 text-sm text-[#71878d]">
              Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((property) => {
              const propertyId =
                property._id || property.id;

              const image =
                property.images?.[0]?.url ||
                property.images?.[0] ||
                "/assets/default-property.jpg";

              const name =
                property.propertyName ||
                property.propertyname ||
                "HomelyHub stay";

              const location =
                property.address?.city ||
                property.address?.area ||
                "Location unavailable";

              const price = Number(
                property.price || 0
              );

              const rating =
                property.rating ||
                property.ratingsAverage ||
                "New";

              return (
                <article
                  key={propertyId}
                  className="group"
                >

                  <div className="relative overflow-hidden rounded-[18px] bg-[#dfe9e9]">

                    <Link
                      to={`/propertylist/${propertyId}`}
                      className="block aspect-[1.18]"
                    >
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
                      />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleWishlist(
                          propertyId
                        )
                      }
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur ${
                        savedIds.includes(
                          propertyId
                        )
                          ? "bg-white text-[#ef6e60]"
                          : "bg-white/90 text-[#19333c]"
                      }`}
                    >
                      <Heart
                        size={17}
                        fill={
                          savedIds.includes(
                            propertyId
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                  </div>

                  <Link
                    to={`/propertylist/${propertyId}`}
                  >
                    <div className="pt-3">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <h3 className="text-[16px] font-extrabold tracking-[-0.02em]">
                            {name}
                          </h3>

                          <p className="mt-1 flex items-center gap-1 text-xs text-[#71878d]">
                            <MapPin size={12} />
                            {location}
                          </p>
                        </div>

                        <span className="flex items-center gap-1 text-xs font-bold">
                          <Star
                            size={13}
                            fill="#0abab5"
                            color="#0abab5"
                          />
                          {rating}
                        </span>

                      </div>

                      <p className="mt-3 text-sm text-[#637980]">
                        <span className="font-extrabold text-[#19333c]">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>{" "}
                        / night
                      </p>

                    </div>
                  </Link>

                </article>
              );
            })}

          </div>
        )}

      </main>
    </div>
  );
};

export default AllStays;