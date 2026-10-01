import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Heart,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";

import {
  getWishlist,
  removeFromWishlist,
} from "../../store/User/User-Action";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await dispatch(getWishlist());
        setWishlist(data || []);
      } catch (error) {
        console.error("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [dispatch]);

  const displayName = useMemo(() => {
    return (
      user?.name ||
      user?.username ||
      user?.email?.split("@")[0] ||
      "User"
    );
  }, [user]);

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const handleRemove = async (propertyId) => {
    try {
      await dispatch(removeFromWishlist(propertyId));

      setWishlist((prev) =>
        prev.filter(
          (property) =>
            String(property._id) !== String(propertyId)
        )
      );
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7faf9]">
        <header className="border-b border-[#e1e8e7] bg-white">
          <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#59bdb9] text-sm font-extrabold text-white">
                hh
              </span>

              <span className="text-xl font-extrabold tracking-[-0.03em] text-[#19333c]">
                HomelyHub<span className="text-[#59bdb9]">.</span>
              </span>
            </Link>
          </div>
        </header>

        <main className="mx-auto flex min-h-[70vh] max-w-[1240px] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#dceceb] border-t-[#59bdb9]" />
            <p className="text-sm font-medium text-[#6d8185]">
              Loading your saved stays...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#dfe7e6] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#59bdb9] text-sm font-extrabold text-white">
              hh
            </span>

            <span className="text-xl font-extrabold tracking-[-0.03em] text-[#19333c]">
              HomelyHub<span className="text-[#59bdb9]">.</span>
            </span>
          </Link>

          {/* NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-semibold text-[#19333c] transition hover:text-[#35a6a3]"
            >
              Stays
            </Link>

            <Link
              to="/ai-trip-planner"
              className="text-sm font-semibold text-[#19333c] transition hover:text-[#35a6a3]"
            >
              Trip Genie
            </Link>

            <Link
              to="/accomodation"
              className="text-sm font-semibold text-[#19333c] transition hover:text-[#35a6a3]"
            >
              List your place
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#19333c] transition hover:bg-[#eef8f7]"
              aria-label="Wishlist"
            >
              <Heart
                size={21}
                strokeWidth={1.8}
                fill="#59bdb9"
                color="#59bdb9"
              />
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden px-2 text-sm font-semibold text-[#19333c] md:block"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  className="rounded-full border border-[#d5e2e1] px-4 py-2 text-sm font-semibold text-[#19333c] transition hover:border-[#59bdb9]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full border border-[#dfe7e8] py-1.5 pl-2 pr-3 text-sm font-semibold text-[#19333c] transition hover:border-[#59bdb9]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dff3f1] text-xs font-bold text-[#147b78]">
                  {initials}
                </span>

                <span className="hidden max-w-[100px] truncate md:block">
                  {displayName}
                </span>

                <ChevronDown size={14} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-[1240px] px-6 pb-20 pt-8">
        {/* BACK */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        {/* PAGE HEADING */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#359c99]">
                Your saved stays
              </p>

              <h1 className="text-4xl font-extrabold tracking-[-0.04em] text-[#19333c] md:text-5xl">
                My Wishlist
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
                Places you saved for your next stay, all in one place.
              </p>
            </div>

            <div className="rounded-full border border-[#d9e6e5] bg-white px-4 py-2 text-sm font-semibold text-[#557075]">
              {wishlist.length}{" "}
              {wishlist.length === 1 ? "saved stay" : "saved stays"}
            </div>
          </div>
        </section>

        {/* EMPTY STATE */}
        {wishlist.length === 0 ? (
          <section className="rounded-[28px] border border-[#e0e9e8] bg-white px-6 py-20 text-center shadow-[0_12px_40px_rgba(25,51,60,0.06)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f5f3]">
              <Heart
                size={28}
                color="#59bdb9"
                strokeWidth={1.8}
              />
            </div>

            <h2 className="text-2xl font-extrabold text-[#19333c]">
              Nothing saved yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#718589]">
              Save a stay you love and it will appear here so you can
              easily find it again.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex rounded-full bg-[#59bdb9] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#45aaa6]"
            >
              Explore stays
            </Link>
          </section>
        ) : (
          /* PROPERTY GRID */
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((property) => {
              const propertyId = property._id;

              const image =
                property.images?.[0]?.url ||
                property.images?.[0] ||
                "/assets/default-property.jpg";

              const propertyName =
                property.propertyName ||
                property.propertyname ||
                "HomelyHub stay";

              const city =
                property.address?.city ||
                property.address?.area ||
                "Location unavailable";

              const state =
                property.address?.state || "";

              const price = Number(property.price || 0);

              const rating =
                property.rating ||
                property.ratingsAverage ||
                "New";

              const reviews =
                property.reviews ||
                property.ratingsQuantity ||
                0;

              return (
                <article
                  key={propertyId}
                  className="group overflow-hidden rounded-[18px] border border-[#dfe8e7] bg-white shadow-[0_8px_25px_rgba(25,51,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(25,51,60,0.11)]"fd
                >
                  {/* IMAGE */}
                 <div className="relative aspect-[1.25] overflow-hidden bg-[#edf3f2]">
                    <Link
                      to={`/propertylist/${propertyId}`}
                      className="block h-full w-full"
                    >
                      <img
                        src={image}
                        alt={propertyName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* SAVED BUTTON */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(propertyId)
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#19333c] shadow-md backdrop-blur transition hover:bg-white"
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                    >
                      <Heart
                        size={18}
                        fill="#59bdb9"
                        color="#59bdb9"
                        strokeWidth={1.8}
                      />
                    </button>

                    {/* PROPERTY TYPE */}
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#19333c] shadow-sm backdrop-blur">
                      {property.propertyType ||
                        property.roomType ||
                        "Stay"}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <Link
                        to={`/propertylist/${propertyId}`}
                        className="line-clamp-1 text-lg font-extrabold tracking-[-0.02em] text-[#19333c] transition hover:text-[#329d9a]"
                      >
                        {propertyName}
                      </Link>

                      <div className="flex shrink-0 items-center gap-1 text-xs font-bold text-[#19333c]">
                        <Star
                          size={13}
                          fill="#59bdb9"
                          color="#59bdb9"
                        />
                        {rating}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-[#718589]">
                      <MapPin size={14} />
                      <span className="truncate">
                        {city}
                        {state ? `, ${state}` : ""}
                      </span>
                    </div>

                    {reviews > 0 && (
                      <p className="mt-1 text-xs text-[#8b9b9e]">
                        {reviews}{" "}
                        {reviews === 1
                          ? "review"
                          : "reviews"}
                      </p>
                    )}

                    <div className="my-4 h-px bg-[#edf1f0]" />

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <span className="text-xl font-extrabold text-[#19333c]">
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        <span className="ml-1 text-xs text-[#798b8f]">
                          / night
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(propertyId)
                        }
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[#b65b5b] transition hover:bg-[#fff1f1]"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <Link
                      to={`/propertylist/${propertyId}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d8e5e4] px-4 py-3 text-sm font-bold text-[#19333c] transition hover:border-[#59bdb9] hover:bg-[#f2faf9]"
                    >
                      <CalendarDays size={15} />
                      View stay
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
};

export default Wishlist;