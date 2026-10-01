import React, { useEffect, useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Moon,
  Receipt,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../LoadingSpinner";
import { fetchBookingDetails } from "../../store/Booking/booking-action";
import MapComponent from "../propertyListing/MapComponent";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // IMPORTANT:
  // The Redux store uses "bookings", not "booking".
  const { bookingDetails, loading } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingDetails(bookingId));
    }
  }, [dispatch, bookingId]);

  const nights = useMemo(() => {
    if (!bookingDetails) return 0;

    // Use backend value if it exists and is valid.
    if (
      bookingDetails.numberOfnights !== undefined &&
      Number(bookingDetails.numberOfnights) > 0
    ) {
      return Number(bookingDetails.numberOfnights);
    }

    // Otherwise calculate from dates.
    if (
      bookingDetails.fromDate &&
      bookingDetails.toDate
    ) {
      const from = new Date(
        bookingDetails.fromDate
      );
      const to = new Date(
        bookingDetails.toDate
      );

      const difference =
        to.getTime() - from.getTime();

      const calculated = Math.round(
        difference / (1000 * 60 * 60 * 24)
      );

      return calculated > 0 ? calculated : 0;
    }

    return 0;
  }, [bookingDetails]);

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading || !bookingDetails) {
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
                <span className="text-[#0abab5]">
                  .
                </span>
              </span>
            </Link>
          </div>
        </header>

        <main className="flex min-h-[75vh] items-center justify-center">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-sm font-medium text-[#71878d]">
              Loading booking details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!bookingDetails.property) {
    return (
      <div className="min-h-screen bg-[#f6faf9]">
        <main className="mx-auto max-w-[700px] px-6 py-20 text-center">
          <h1 className="text-2xl font-extrabold text-[#19333c]">
            Booking details unavailable
          </h1>

          <p className="mt-3 text-sm text-[#71878d]">
            We couldn't load the property connected to this booking.
          </p>

          <Link
            to="/user/mybookings"
            className="mt-7 inline-flex rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-extrabold text-[#06232d]"
          >
            Back to my bookings
          </Link>
        </main>
      </div>
    );
  }

  const property = bookingDetails.property;

  const propertyName =
    property.propertyName ||
    property.propertyname ||
    "HomelyHub stay";

  const address = property.address || {};

  const location = [
    address.area,
    address.city,
    address.state,
  ]
    .filter(Boolean)
    .join(", ");

  const images =
    property.images?.filter(Boolean) || [];

  const mainImage =
    images[0]?.url ||
    images[0] ||
    "/assets/default-property.jpg";

  const totalPrice = Number(
    bookingDetails.price || 0
  );

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

          <Link
            to="/user/mybookings"
            className="text-sm font-bold text-[#587078] transition hover:text-[#0abab5]"
          >
            My bookings
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1180px] px-5 pb-20 pt-8 lg:px-8">

        <button
          type="button"
          onClick={() =>
            navigate("/user/mybookings")
          }
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Back to my bookings
        </button>

        {/* TITLE */}
        <div className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e6f8f6] px-3 py-1.5 text-xs font-bold text-[#087c7a]">
            <CheckCircle2 size={14} />
            Booking confirmed
          </div>

          <h1 className="text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
            {propertyName}
          </h1>

          {location && (
            <p className="mt-3 flex items-center gap-2 text-sm text-[#71878d]">
              <MapPin
                size={16}
                className="text-[#0abab5]"
              />
              {location}
            </p>
          )}

        </div>

        {/* IMAGE */}
        <div className="mb-8 overflow-hidden rounded-[26px] bg-[#dfe9e9] shadow-[0_12px_35px_rgba(25,51,60,0.08)]">
          <img
            src={mainImage}
            alt={propertyName}
            className="h-[300px] w-full object-cover sm:h-[420px]"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* LEFT */}
          <section>

            <div className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_10px_35px_rgba(25,51,60,0.05)] sm:p-8">

              <h2 className="text-2xl font-extrabold tracking-[-0.035em]">
                Booking information
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f6faf9] p-5">
                  <div className="flex items-center gap-2 text-[#8da0a4]">
                    <CalendarDays size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                      Check-in
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-extrabold">
                    {formatDate(
                      bookingDetails.fromDate
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f6faf9] p-5">
                  <div className="flex items-center gap-2 text-[#8da0a4]">
                    <CalendarDays size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                      Check-out
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-extrabold">
                    {formatDate(
                      bookingDetails.toDate
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f6faf9] p-5">
                  <div className="flex items-center gap-2 text-[#8da0a4]">
                    <Moon size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                      Stay
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-extrabold">
                    {nights}{" "}
                    {nights === 1
                      ? "night"
                      : "nights"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f6faf9] p-5">
                  <div className="flex items-center gap-2 text-[#8da0a4]">
                    <Receipt size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
                      Guests
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-extrabold">
                    {bookingDetails.guests || "—"}
                  </p>
                </div>

              </div>

            </div>

           {/* LOCATION */}
<div className="mt-6 rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_10px_35px_rgba(25,51,60,0.05)] sm:p-8">

  <h2 className="text-2xl font-extrabold tracking-[-0.035em]">
    Property location
  </h2>

  <div className="mt-5 overflow-hidden rounded-2xl">
    <MapComponent address={address} />
  </div>

</div>

          </section>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-[95px] lg:self-start">

            <div className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_16px_50px_rgba(13,43,53,0.09)]">

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#93a5a8]">
                Booking total
              </p>

              <p className="mt-2 text-3xl font-black tracking-[-0.04em]">
                ₹{totalPrice.toLocaleString("en-IN")}
              </p>

              <p className="mt-1 text-sm text-[#71878d]">
                {nights}{" "}
                {nights === 1 ? "night" : "nights"}
              </p>

              <div className="my-6 border-t border-[#e7eeee]" />

              <div className="space-y-4 text-sm">

                <div className="flex justify-between gap-4">
                  <span className="text-[#71878d]">
                    Check-in
                  </span>

                  <span className="font-semibold">
                    {formatDate(
                      bookingDetails.fromDate
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#71878d]">
                    Check-out
                  </span>

                  <span className="font-semibold">
                    {formatDate(
                      bookingDetails.toDate
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-[#71878d]">
                    Guests
                  </span>

                  <span className="font-semibold">
                    {bookingDetails.guests}
                  </span>
                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-[#eaf8f6] p-4">

                <div className="flex items-center gap-2 text-sm font-bold text-[#087c7a]">
                  <CheckCircle2 size={16} />
                  Confirmed booking
                </div>

                <p className="mt-2 text-xs leading-5 text-[#71878d]">
                  Your stay has been successfully booked
                  through HomelyHub.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

export default BookingDetails;