import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  CalendarDays,
  ChevronDown,
  Info,
  ShieldCheck,
  Users,
} from "lucide-react";

import { setPaymentDetails } from "../../store/Payment/payment-slice";

const PaymentForm = ({
  price,
  propertyName,
  address,
  maximumGuest,
  propertyId,
  currentBookings = [],
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [selectedNights, setSelectedNights] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { RangePicker } = DatePicker;

  const { isAuthenticated } = useSelector(
    (state) => state.user
  );

  const nightPrice = Number(price) || 0;
  const maxGuests = Number(maximumGuest) || 1;

  const isDateDisabled = (current) => {
    const today = moment().startOf("day");

    if (current.isBefore(today)) {
      return true;
    }

    return currentBookings.some((booking) => {
      const startDate = moment(booking.fromDate).startOf("day");
      const endDate = moment(booking.toDate).startOf("day");
      const currentMoment = moment(current.toDate()).startOf("day");

      return (
        currentMoment.isSameOrAfter(startDate) &&
        currentMoment.isSameOrBefore(endDate)
      );
    });
  };

  const form = useForm({
    defaultValues: {
      dateRange: [],
      guests: "",
      name: "",
      phoneNumber: "",
    },

    onSubmit: async ({ value }) => {
      const [checkinDate, checkoutDate] = value.dateRange;

      if (!checkinDate || !checkoutDate) {
        alert("Please select your check-in and check-out dates.");
        return;
      }

      const nights = moment(checkoutDate, "YYYY-MM-DD").diff(
        moment(checkinDate, "YYYY-MM-DD"),
        "days"
      );

      const { name, guests, phoneNumber } = value;

      console.log("BOOKING SUBMIT");
      console.log("Price per night:", nightPrice);
      console.log("Check-in:", checkinDate);
      console.log("Check-out:", checkoutDate);
      console.log("Nights:", nights);
      console.log("Calculated price:", calculatedPrice);
      console.log("Guests:", guests);

      if (
        name &&
        guests &&
        phoneNumber &&
        checkinDate &&
        checkoutDate &&
        Number(guests) > 0 &&
        Number(guests) <= maxGuests &&
        nights > 0
      ) {
        await dispatch(
          setPaymentDetails({
            checkinDate,
            checkoutDate,
            nights,
            totalPrice: calculatedPrice,
            propertyName,
            address,
            guests: Number(guests),
            name,
            phoneNumber,
          })
        );

        navigate(`/payment/${propertyId}`);
      } else {
        alert("Please fill all fields correctly before proceeding.");
      }
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="w-full"
      >
        {/* PRICE */}
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black tracking-[-0.04em] text-[#19333c]">
                ₹{nightPrice.toLocaleString("en-IN")}
              </span>

              <span className="text-sm text-[#788b8f]">
                / night
              </span>
            </div>

            {selectedNights > 0 && (
              <p className="mt-1 text-xs font-medium text-[#71878d]">
                ₹{nightPrice.toLocaleString("en-IN")} ×{" "}
                {selectedNights}{" "}
                {selectedNights === 1 ? "night" : "nights"}
              </p>
            )}
          </div>

          {selectedNights > 0 && (
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#97a9ac]">
                Stay total
              </p>

              <p className="text-lg font-extrabold text-[#19333c]">
                ₹{calculatedPrice.toLocaleString("en-IN")}
              </p>
            </div>
          )}
        </div>

        {/* DATE PICKER */}
        <form.Field name="dateRange">
          {(field) => (
            <div className="mb-3">
              <div className="overflow-hidden rounded-xl border border-[#dfe8e7] bg-white">
                <div className="border-b border-[#edf1f1] px-4 py-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]">
                    <CalendarDays
                      size={14}
                      className="text-[#0abab5]"
                    />
                    Choose your dates
                  </div>
                </div>

                <div className="p-3">
                  <RangePicker
                    className="!h-11 !w-full !border-0 !shadow-none"
                    format="YYYY-MM-DD"
                    picker="date"
                    disabledDate={isDateDisabled}
                    placeholder={[
                      "Check in",
                      "Check out",
                    ]}
                    onChange={(value, dateString) => {
                      console.log(
                        "DATE PICKER:",
                        dateString
                      );

                      field.handleChange(
                        dateString || []
                      );

                      const [checkin, checkout] =
                        dateString || [];

                      if (checkin && checkout) {
                        const nights = moment(
                          checkout,
                          "YYYY-MM-DD"
                        ).diff(
                          moment(
                            checkin,
                            "YYYY-MM-DD"
                          ),
                          "days"
                        );

                        const total =
                          nightPrice * nights;

                        console.log(
                          "Price per night:",
                          nightPrice
                        );
                        console.log(
                          "Nights:",
                          nights
                        );
                        console.log(
                          "TOTAL:",
                          total
                        );

                        setSelectedNights(nights);
                        setCalculatedPrice(total);
                      } else {
                        setSelectedNights(0);
                        setCalculatedPrice(0);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </form.Field>

        {/* GUESTS */}
        <form.Field
          name="guests"
          validators={{
            onChange: ({ value }) => {
              const guestCount = Number(value);

              return guestCount > 0 &&
                guestCount <= maxGuests
                ? undefined
                : `Guests must be 1 - ${maxGuests}`;
            },
          }}
        >
          {(field) => (
            <div className="mb-3">
              <div className="rounded-xl border border-[#dfe8e7] bg-white px-4 py-3">
                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]">
                  <Users
                    size={14}
                    className="text-[#0abab5]"
                  />
                  Guests
                </label>

                <div className="mt-2 flex items-center">
                  <input
                    type="number"
                    min="1"
                    max={maxGuests}
                    placeholder={`Up to ${maxGuests}`}
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                  <ChevronDown
                    size={15}
                    className="text-[#8ca0a4]"
                  />
                </div>
              </div>

              {field.state.meta.errors?.length > 0 && (
                <p className="mt-1.5 text-xs font-medium text-[#e05f5f]">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* NAME */}
        <form.Field name="name">
          {(field) => (
            <div className="mb-3 rounded-xl border border-[#dfe8e7] bg-white px-4 py-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]">
                Full name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                className="mt-2 w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
              />
            </div>
          )}
        </form.Field>

        {/* PHONE */}
        <form.Field name="phoneNumber">
          {(field) => (
            <div className="mb-4 rounded-xl border border-[#dfe8e7] bg-white px-4 py-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]">
                Phone number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value)
                }
                className="mt-2 w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
              />
            </div>
          )}
        </form.Field>

        {/* TOTAL */}
        <div className="mb-4 rounded-xl bg-[#f3f9f8] px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#71878d]">
              Total before payment
            </span>

            <span className="text-lg font-extrabold text-[#19333c]">
              ₹{calculatedPrice.toLocaleString("en-IN")}
            </span>
          </div>

          {selectedNights > 0 && (
            <p className="mt-1 text-[11px] text-[#8a9a9d]">
              {selectedNights}{" "}
              {selectedNights === 1
                ? "night"
                : "nights"}{" "}
              × ₹
              {nightPrice.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        {/* BOOK BUTTON */}
        <div>
          {!isAuthenticated ? (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98]"
            >
              Login to Book
              <span>→</span>
            </button>
          ) : (
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98]"
            >
              Book this place
              <span>→</span>
            </button>
          )}
        </div>

        {/* TRUST MESSAGE */}
        <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-[#7a8e92]">
          <ShieldCheck
            size={14}
            className="mt-0.5 shrink-0 text-[#0abab5]"
          />

          <span>
            Your booking will be sent to the payment
            step after your dates and guest details are
            confirmed.
          </span>
        </div>

        {/* DEBUG / INFO */}
        <div className="mt-4 flex items-center gap-2 text-[10px] text-[#9aa9ac]">
          <Info size={12} />
          Maximum guests: {maxGuests}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
