import React, { useEffect } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Share2,
  Sparkles,
  Star,
  Tv,
  Utensils,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetails-Action";
import LoadingSpinner from "../LoadingSpinner";
import PropertyImg from "./PropertyImg";
import PaymentForm from "./PaymentForm";
import PropertyAmenities from "./PropertyAmenities";
import PropertMapInfo from "./PropertyMapInfo";

const PropertyListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    propertydetails,
  } = useSelector(
    (state) => state.propertyDetails
  );

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (id) {
      dispatch(getPropertyDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !propertydetails) {
    return (
      <div className="min-h-screen bg-[#f6faf9]">
        <header className="border-b border-[#dfe7e8] bg-white">
          <div className="mx-auto flex h-[74px] max-w-[1240px] items-center px-5 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold tracking-[-0.08em] text-[#06232d]">
                hh
              </span>

              <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
                HomelyHub
                <span className="text-[#0abab5]">.</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="flex min-h-[75vh] items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-sm text-[#71878d]">
              Loading stay...
            </p>
          </div>
        </main>
      </div>
    );
  }

  const {
    propertyName,
    address = {},
    description,
    images = [],
    amenities = [],
    maximumGuest,
    price,
    currentBookings = [],
    propertyType,
    roomType,
    rating,
    ratingsAverage,
    reviews,
    ratingsQuantity,
  } = propertydetails;

  const averageRating =
    rating || ratingsAverage || null;

  const reviewCount =
    reviews || ratingsQuantity || 0;

  const firstImage =
    images?.[0]?.url ||
    images?.[0] ||
    "/assets/default-property.jpg";

  const displayLocation = [
    address.area,
    address.city,
    address.state,
  ]
    .filter(Boolean)
    .join(", ");

  const amenityIcons = {
    Wifi,
    wifi: Wifi,
    kitchen: Utensils,
    Kitchen: Utensils,
    Ac: Wind,
    AC: Wind,
    "Waching machine": Waves,
    "Washing Machine": Waves,
    Tv: Tv,
    TV: Tv,
    pool: Waves,
    Pool: Waves,
    "Free Parking": BedDouble,
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
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold tracking-[-0.08em] text-[#06232d]">
              hh
            </span>

            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
              HomelyHub
              <span className="text-[#0abab5]">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              to="/"
              className="text-[13px] font-semibold text-[#587078] hover:text-[#0abab5]"
            >
              Stays
            </Link>

            <Link
              to="/ai-trip-planner"
              className="text-[13px] font-semibold text-[#587078] hover:text-[#0abab5]"
            >
              Trip Genie
            </Link>

            <Link
              to="/accomodationform"
              className="text-[13px] font-semibold text-[#587078] hover:text-[#0abab5]"
            >
              List your place
            </Link>
          </nav>

          <div className="flex items-center gap-3">

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe7e8] text-[#19333c] transition hover:border-[#0abab5]"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login");
                  return;
                }

                navigate("/wishlist");
              }}
              aria-label="Wishlist"
            >
              <Heart size={17} />
            </button>

            <Link
              to={
                isAuthenticated
                  ? "/profile"
                  : "/login"
              }
              className="flex items-center gap-2 rounded-full border border-[#dfe7e8] px-3 py-1.5 text-sm font-semibold"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e2f5f3] text-xs font-bold text-[#087c7a]">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "U"}
              </span>

              <span className="hidden md:block">
                {isAuthenticated
                  ? "Profile"
                  : "Log in"}
              </span>
            </Link>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1180px] px-5 pb-20 pt-7 lg:px-8">

        {/* BACK */}
        <Link
          to="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Explore stays
        </Link>

        {/* TITLE */}
        <section className="mb-6">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-[#e3f7f5] px-3 py-1 text-[11px] font-bold text-[#087c7a]">
                  {propertyType || "Stay"}
                </span>

                {averageRating && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#60767a]">
                    <Star
                      size={13}
                      fill="#0abab5"
                      color="#0abab5"
                    />
                    {averageRating}
                    {reviewCount
                      ? ` · ${reviewCount} reviews`
                      : ""}
                  </span>
                )}

              </div>

              <h1 className="text-4xl font-black tracking-[-0.06em] text-[#102d3a] sm:text-5xl">
                {propertyName}
              </h1>

              {displayLocation && (
                <p className="mt-3 flex items-center gap-2 text-sm text-[#71878d]">
                  <MapPin
                    size={16}
                    className="text-[#0abab5]"
                  />
                  {displayLocation}
                  {roomType
                    ? ` · ${roomType}`
                    : ""}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#dfe7e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#19333c] hover:border-[#0abab5]"
              >
                <Share2 size={15} />
                Share
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                    return;
                  }

                  navigate("/wishlist");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#dfe7e8] bg-white px-4 py-2.5 text-sm font-semibold text-[#19333c] hover:border-[#0abab5]"
              >
                <Heart size={15} />
                Save
              </button>

            </div>

          </div>

        </section>

        {/* IMAGE GALLERY */}
        <section className="mb-10 overflow-hidden rounded-[28px]">

          <div className="grid h-[420px] gap-2 md:grid-cols-[1.65fr_1fr]">

            <div className="overflow-hidden">
              <img
                src={firstImage}
                alt={propertyName}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="hidden gap-2 md:grid md:grid-rows-2">
              <div className="overflow-hidden">
                <img
                  src={
                    images?.[1]?.url ||
                    images?.[1] ||
                    firstImage
                  }
                  alt={`${propertyName} 2`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="overflow-hidden">
                <img
                  src={
                    images?.[2]?.url ||
                    images?.[2] ||
                    firstImage
                  }
                  alt={`${propertyName} 3`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

          </div>

        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}
          <div>

            {/* HOST */}
            <section className="border-b border-[#dfe8e7] pb-7">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8fa2a5]">
                    Hosted with HomelyHub
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold">
                    Your HomelyHub stay
                  </h2>

                  <p className="mt-1 text-sm text-[#71878d]">
                    A place designed for a comfortable stay.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dff4f2] text-sm font-extrabold text-[#087c7a]">
                  HH
                </div>

              </div>

            </section>

            {/* ABOUT */}
            <section className="border-b border-[#dfe8e7] py-8">

              <h2 className="flex items-center gap-2 text-2xl font-extrabold tracking-[-0.035em]">
                <Sparkles
                  size={20}
                  className="text-[#0abab5]"
                />
                About this place
              </h2>

              <p className="mt-5 max-w-[720px] whitespace-pre-line text-sm leading-7 text-[#637980]">
                {description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#19333c]">
                <UsersIcon />
                Up to {maximumGuest} guests
              </div>

            </section>

            {/* HIGHLIGHTS */}
            <section className="border-b border-[#dfe8e7] py-8">

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">

                <Highlight
                  icon={<Sparkles size={18} />}
                  title="Comfortable stay"
                  text="Thoughtfully hosted"
                />

                <Highlight
                  icon={<Wifi size={18} />}
                  title="Wi-Fi"
                  text="Connectivity available"
                />

                <Highlight
                  icon={<Utensils size={18} />}
                  title="Essentials"
                  text="Useful amenities"
                />

                <Highlight
                  icon={<Waves size={18} />}
                  title="Relaxing"
                  text="Enjoy your stay"
                />

              </div>

            </section>

            {/* AMENITIES */}
            <section className="border-b border-[#dfe8e7] py-8">

              <h2 className="text-2xl font-extrabold tracking-[-0.035em]">
                What this place offers
              </h2>

              <div className="mt-6">
                <PropertyAmenities
                  amenities={amenities}
                />
              </div>

            </section>

            {/* MAP */}
            <section className="pt-8">

              <h2 className="text-2xl font-extrabold tracking-[-0.035em]">
                Where you'll be
              </h2>

              <div className="mt-5 overflow-hidden rounded-[24px] border border-[#dfe8e7] bg-white p-3">
                <PropertMapInfo
                  address={address}
                />
              </div>

            </section>

          </div>

          {/* RIGHT BOOKING CARD */}
          <aside className="lg:sticky lg:top-[95px] lg:self-start">

            <div className="rounded-[26px] border border-[#d8e5e4] bg-white p-6 shadow-[0_18px_50px_rgba(13,43,53,0.10)]">

              <div className="flex items-end justify-between gap-3">

                <div>
                  <span className="text-2xl font-black tracking-[-0.04em]">
                    ₹
                    {Number(price || 0).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="ml-1 text-sm text-[#71878d]">
                    / night
                  </span>
                </div>

                {averageRating && (
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <Star
                      size={13}
                      fill="#0abab5"
                      color="#0abab5"
                    />
                    {averageRating}
                  </div>
                )}

              </div>

              <div className="my-6 border-t border-[#e5eceb]" />

              <PaymentForm
                propertyId={id}
                price={price}
                propertyName={propertyName}
                address={address}
                maximumGuest={maximumGuest}
                currentBookings={currentBookings}
              />

            </div>

            <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[#e8f7f5] p-4 text-xs leading-5 text-[#71878d]">
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-[#0abab5]"
              />
              Select your dates and guest details to continue
              to booking.
            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

const Highlight = ({
  icon,
  title,
  text,
}) => (
  <div>
    <div className="text-[#0abab5]">
      {icon}
    </div>

    <p className="mt-3 text-sm font-extrabold">
      {title}
    </p>

    <p className="mt-1 text-xs leading-5 text-[#71878d]">
      {text}
    </p>
  </div>
);

const UsersIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default PropertyListing;
