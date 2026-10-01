import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Moon,
  Receipt,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../LoadingSpinner";
import {
  fetchBookingDetails,
  FetchUserBookings,
} from "../../store/Booking/booking-action";

const MyBookings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bookings = [], loading } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    dispatch(FetchUserBookings());
  }, [dispatch]);

  const handleBookingClick = (bookingId) => {
    dispatch(fetchBookingDetails(bookingId));

    // Keep this lowercase to match App.jsx
    navigate(`/user/mybookings/${bookingId}`);
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getImage = (booking) => {
    return (
      booking?.property?.images?.[0]?.url ||
      booking?.property?.images?.[0] ||
      "/assets/default-property.jpg"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6faf9]">
        <header className="border-b border-[#dfe7e8] bg-white">
          <div className="mx-auto flex h-[74px] max-w-[1240px] items-center px-5 lg:px-8">
            <Link to="/" className="flex items-center gap-2.5">
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
            <p className="mt-4 text-sm font-medium text-[#71878d]">
              Loading your bookings...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#dfe7e8]/80 bg-white/95 backdrop-blur-xl">
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
              className="text-[13px] font-semibold text-[#587078] transition hover:text-[#0abab5]"
            >
              Stays
            </Link>

            <Link
              to="/ai-trip-planner"
              className="text-[13px] font-semibold text-[#587078] transition hover:text-[#0abab5]"
            >
              Trip Genie
            </Link>

            <Link
              to="/accomodationform"
              className="text-[13px] font-semibold text-[#587078] transition hover:text-[#0abab5]"
            >
              List your place
            </Link>
          </nav>

          <div className="flex items-center gap-3">

            <Link
              to="/wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#19333c] transition hover:bg-[#edfafa]"
              aria-label="Wishlist"
            >
              ♡
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-[#dfe7e8] py-1.5 pl-2 pr-3 text-sm font-semibold text-[#19333c] transition hover:border-[#0abab5]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e2f5f3] text-xs font-bold text-[#087c7a]">
                U
              </span>

              <span className="hidden md:block">
                Profile
              </span>
            </Link>

          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-8 lg:px-8">

        {/* BACK */}
        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Back to profile
        </Link>

        {/* HEADING */}
        <section className="mb-10">

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Your HomelyHub
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h1 className="text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
                My bookings
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
                Keep track of your stays, dates, and booking details in one place.
              </p>
            </div>

            <div className="rounded-full border border-[#dce7e6] bg-white px-4 py-2 text-sm font-bold text-[#587078]">
              {bookings.length}{" "}
              {bookings.length === 1
                ? "booking"
                : "bookings"}
            </div>

          </div>
        </section>

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <section className="rounded-[28px] border border-[#dfe8e7] bg-white px-6 py-20 text-center shadow-[0_12px_40px_rgba(25,51,60,0.06)]">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7f5]">
              <CalendarDays
                size={28}
                className="text-[#0abab5]"
              />
            </div>

            <h2 className="text-2xl font-extrabold tracking-[-0.03em]">
              Nothing booked yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71878d]">
              Your confirmed stays will appear here once you make a booking.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc]"
            >
              Explore stays
              <ArrowRight size={16} />
            </Link>

          </section>
        ) : (
          <section className="space-y-6">

            {bookings.map((booking) => {

              const propertyName =
                booking?.property?.propertyName ||
                booking?.property?.propertyname ||
                "HomelyHub stay";

              const city =
                booking?.property?.address?.city ||
                booking?.property?.address?.area ||
                "Location unavailable";

              const state =
                booking?.property?.address?.state ||
                "";

             const nights = (() => {
  if (
    booking?.numberOfnights !== undefined &&
    Number(booking.numberOfnights) > 0
  ) {
    return Number(booking.numberOfnights);
  }

  if (booking?.fromDate && booking?.toDate) {
    const from = new Date(booking.fromDate);
    const to = new Date(booking.toDate);

    const difference =
      to.getTime() - from.getTime();

    const calculated = Math.round(
      difference / (1000 * 60 * 60 * 24)
    );

    return calculated > 0 ? calculated : 0;
  }

  return 0;
})();

              const price = Number(
                booking?.price || 0
              );

              return (
                <article
                  key={booking._id}
                  onClick={() =>
                    handleBookingClick(booking._id)
                  }
                  className="group cursor-pointer overflow-hidden rounded-[26px] border border-[#dfe8e7] bg-white shadow-[0_10px_35px_rgba(25,51,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,51,60,0.11)]"
                >

                  <div className="grid lg:grid-cols-[270px_1fr]">

                    {/* IMAGE */}
                    <div className="relative h-[230px] overflow-hidden lg:h-full lg:min-h-[260px]">

                      <img
                        src={getImage(booking)}
                        alt={propertyName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#087c7a] shadow-sm backdrop-blur">
                        Booking confirmed
                      </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6 sm:p-7">

                      <div className="flex flex-col justify-between gap-5 md:flex-row">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8ea0a4]">
                            Your stay
                          </p>

                          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[#19333c]">
                            {propertyName}
                          </h2>

                          <p className="mt-2 flex items-center gap-1.5 text-sm text-[#71878d]">
                            <MapPin size={14} className="text-[#0abab5]" />
                            {city}
                            {state ? `, ${state}` : ""}
                          </p>

                        </div>

                        <div className="self-start rounded-full bg-[#e7f8f6] px-3 py-1.5 text-xs font-bold text-[#087c7a]">
                          View booking
                        </div>

                      </div>

                      {/* BOOKING INFO */}
                      <div className="mt-7 grid gap-3 sm:grid-cols-3">

                        <div className="rounded-2xl bg-[#f6faf9] p-4">
                          <div className="flex items-center gap-2 text-[#8da0a4]">
                            <CalendarDays size={15} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                              Check-in
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-bold text-[#19333c]">
                            {formatDate(
                              booking.fromDate
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#f6faf9] p-4">
                          <div className="flex items-center gap-2 text-[#8da0a4]">
                            <CalendarDays size={15} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                              Check-out
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-bold text-[#19333c]">
                            {formatDate(
                              booking.toDate
                            )}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-[#f6faf9] p-4">
                          <div className="flex items-center gap-2 text-[#8da0a4]">
                            <Moon size={15} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                              Stay
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-bold text-[#19333c]">
                            {nights}{" "}
                            {Number(nights) === 1
                              ? "night"
                              : "nights"}
                          </p>
                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="mt-6 flex flex-col gap-4 border-t border-[#edf1f1] pt-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-2 text-[#587078]">
                          <Receipt
                            size={16}
                            className="text-[#0abab5]"
                          />

                          <span className="text-sm">
                            Total price
                          </span>

                          <span className="text-lg font-extrabold text-[#19333c]">
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#087c7a] transition group-hover:gap-3">
                          Open booking
                          <ChevronRight size={16} />
                        </span>

                      </div>

                    </div>
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

export default MyBookings;
