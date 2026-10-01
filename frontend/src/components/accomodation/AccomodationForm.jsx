import React, { useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  Clock3,
  Home,
  ImagePlus,
  ListChecks,
  MapPin,
  Sparkles,
  Users,
  WalletCards,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import ImagesUploading from "./ImagesUploading";
import { getAiDescription } from "../../ai/aiDescription";
import { AddressField } from "./AddressField";
import AmenitiesField from "./AmenitiesField";

import {
  createAccomodation,
  getAllAccomodation,
} from "../../store/Accomodation/Accomodation-action";

const Section = ({
  icon: Icon,
  title,
  hint,
  children,
}) => {
  return (
    <section className="rounded-[24px] border border-[#dfe8e7] bg-white p-6 shadow-[0_8px_30px_rgba(25,51,60,0.05)] sm:p-7">

      <div className="mb-6 flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f7f5]">
          <Icon
            size={18}
            className="text-[#087c7a]"
          />
        </div>

        <div>
          <h2 className="text-lg font-extrabold tracking-[-0.025em] text-[#19333c]">
            {title}
          </h2>

          {hint && (
            <p className="mt-1 text-xs text-[#87999d]">
              {hint}
            </p>
          )}
        </div>

      </div>

      {children}
    </section>
  );
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 text-sm font-semibold text-[#19333c] outline-none transition focus:border-[#0abab5] focus:ring-2 focus:ring-[#0abab5]/10 placeholder:text-[#a1afb2]";

const labelClass =
  "text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]";

const AccomodationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(
    (state) => state.accomodation
  );

  const [aiLoading, setAiLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      propertyType: undefined,
      roomType: undefined,
      extraInfo: undefined,
      images: [],
      amenities: [],
      address: {
        area: "",
        city: "",
        state: "",
        pincode: "",
      },
      checkIn: undefined,
      checkOut: undefined,
      maximumGuest: 0,
      price: "",
    },

    onSubmit: async ({ value }) => {
      try {
        console.log(value);

        await dispatch(
          createAccomodation({
            propertyName: value.name,
            description: value.description,
            propertyType: value.propertyType,
            roomType: value.roomType,
            extraInfo: value.extraInfo,
            images: value.images,
            address: value.address,
            amenities: value.amenities,
            checkInTime: value.checkIn,
            checkOutTime: value.checkOut,
            maximumGuest: value.maximumGuest,
            price: value.price,
          })
        );

        await dispatch(getAllAccomodation());

        toast.success(
          "New Property Created Successfully"
        );

        navigate("/accomodation");
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Could not create property"
        );

        console.error(error);
      }
    },
  });

  const handleAiDescription = async (field) => {
    const values = form.state.values;

    if (!values.name) {
      toast.error("Please add a title first");
      return;
    }

    setAiLoading(true);

    try {
      const description =
        await getAiDescription(values);

      field.handleChange(description);

      toast.success("Description added");
    } catch (error) {
      toast.error(
        "Could not generate a description"
      );

      console.error(error);
    } finally {
      setAiLoading(false);
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
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold tracking-[-0.08em] text-[#06232d]">
              hh
            </span>

            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
              HomelyHub
              <span className="text-[#0abab5]">.</span>
            </span>
          </Link>

          <Link
            to="/accomodation"
            className="text-sm font-bold text-[#60767a] transition hover:text-[#0abab5]"
          >
            My places
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1000px] px-5 pb-24 pt-9 lg:px-8">

        <Link
          to="/accomodation"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Back to my places
        </Link>

        {/* HERO */}
        <section className="mb-9">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Host with HomelyHub
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[#102d3a] sm:text-5xl">
            List your place.
          </h1>

          <p className="mt-4 max-w-[680px] text-base leading-7 text-[#6d8185]">
            Tell guests what makes your place special.
            Add the essentials, upload your photos, and
            publish when everything looks right.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#e5f7f5] px-3 py-1.5 text-xs font-bold text-[#087c7a]">
              <Sparkles size={13} />
              AI description available
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#71878d] ring-1 ring-[#dfe8e7]">
              <Check size={13} />
              Real property listing
            </span>

          </div>

        </section>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >

          {/* TITLE */}
          <Section
            icon={Home}
            title="Give your place a name"
            hint="Short, clear, and memorable works best."
          >
            <form.Field name="name">
              {(field) => (
                <input
                  className={inputClass}
                  type="text"
                  placeholder="Sunny cottage near the beach"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value
                    )
                  }
                />
              )}
            </form.Field>
          </Section>

          {/* ADDRESS */}
          <Section
            icon={MapPin}
            title="Where is it?"
            hint="Add the property's location."
          >
            <div className="rounded-2xl bg-[#f7faf9] p-4">
              <AddressField form={form} />
            </div>
          </Section>

          {/* PHOTOS */}
          <Section
            icon={ImagePlus}
            title="Show guests the place"
            hint="Add your property photos. At least 6 are recommended."
          >
            <div className="rounded-2xl border border-dashed border-[#b9d9d7] bg-[#fbfdfd] p-5">
              <form.Field name="images">
                {(field) => (
                  <ImagesUploading field={field} />
                )}
              </form.Field>
            </div>
          </Section>

          {/* PROPERTY */}
          <Section
            icon={BedDouble}
            title="Property details"
            hint="Tell guests what kind of place they're booking."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Property type
                </label>

                <form.Field name="propertyType">
                  {(field) => (
                    <select
                      className={inputClass}
                      value={field.state.value || ""}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value
                        )
                      }
                    >
                      <option value="" disabled>
                        Select property type
                      </option>

                      <option value="House">
                        House
                      </option>

                      <option value="Flat">
                        Flat
                      </option>

                      <option value="Guest House">
                        Guest House
                      </option>

                      <option value="Hotel">
                        Hotel
                      </option>
                    </select>
                  )}
                </form.Field>
              </div>

              <div>
                <label className={labelClass}>
                  Room type
                </label>

                <form.Field name="roomType">
                  {(field) => (
                    <select
                      className={inputClass}
                      value={field.state.value || ""}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value
                        )
                      }
                    >
                      <option value="" disabled>
                        Select room type
                      </option>

                      <option value="Anytype">
                        Any type
                      </option>

                  <option value="Entire home">
                    Entire Home
                    </option>

                      <option value="Room">
                        Room
                      </option>
                    </select>
                  )}
                </form.Field>
              </div>

            </div>

          </Section>

          {/* AMENITIES */}
          <Section
            icon={ListChecks}
            title="What do you offer?"
            hint="Choose the amenities available at your place."
          >
            <div className="rounded-2xl bg-[#fbfdfd]">
              <AmenitiesField form={form} />
            </div>
          </Section>

          {/* HOUSE RULES */}
          <Section
            icon={ListChecks}
            title="House rules"
            hint="Optional — help guests know what to expect."
          >
            <form.Field name="extraInfo">
              {(field) => (
                <textarea
                  className={`${inputClass} min-h-[120px] resize-y`}
                  rows="4"
                  placeholder="Check-in after 1pm, no smoking indoors..."
                  value={field.state.value || ""}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value
                    )
                  }
                />
              )}
            </form.Field>
          </Section>

          {/* DESCRIPTION */}
          <Section
            icon={Sparkles}
            title="Describe your place"
            hint="Tell guests what makes your stay special."
          >
            <form.Field name="description">
              {(field) => (
                <>

                  <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                    <p className="text-sm text-[#71878d]">
                      Write it yourself or let Trip Genie
                      help you get started.
                    </p>

                    <button
                      type="button"
                      disabled={aiLoading}
                      onClick={() =>
                        handleAiDescription(field)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e4f7f5] px-4 py-2.5 text-xs font-extrabold text-[#087c7a] transition hover:bg-[#d7f2ef] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Sparkles size={14} />

                      {aiLoading
                        ? "Writing..."
                        : "Write with AI"}
                    </button>

                  </div>

                  <textarea
                    className={`${inputClass} min-h-[170px] resize-y`}
                    rows="6"
                    placeholder="Write a few lines about the atmosphere, location, rooms, views, and what guests can expect..."
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value
                      )
                    }
                  />

                </>
              )}
            </form.Field>
          </Section>

          {/* STAY DETAILS */}
          <Section
            icon={CalendarDays}
            title="Stay details"
            hint="Set your check-in, check-out, guest limit, and price."
          >

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* CHECK IN */}
              <div>
                <label className={labelClass}>
                  Check-in
                </label>

                <form.Field name="checkIn">
                  {(field) => (
                    <div className="relative">
                      <Clock3
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0abab5]"
                      />

                      <input
                        className={`${inputClass} pl-11`}
                        type="time"
                        value={
                          field.state.value || ""
                        }
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {/* CHECK OUT */}
              <div>
                <label className={labelClass}>
                  Check-out
                </label>

                <form.Field name="checkOut">
                  {(field) => (
                    <div className="relative">
                      <Clock3
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0abab5]"
                      />

                      <input
                        className={`${inputClass} pl-11`}
                        type="time"
                        value={
                          field.state.value || ""
                        }
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {/* GUESTS */}
              <div>
                <label className={labelClass}>
                  Maximum guests
                </label>

                <form.Field name="maximumGuest">
                  {(field) => (
                    <div className="relative">
                      <Users
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0abab5]"
                      />

                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="1"
                        placeholder="2"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>
              </div>

              {/* PRICE */}
              <div>
                <label className={labelClass}>
                  Price / night
                </label>

                <form.Field name="price">
                  {(field) => (
                    <div className="relative">
                      <WalletCards
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0abab5]"
                      />

                      <input
                        className={`${inputClass} pl-11`}
                        type="number"
                        min="0"
                        placeholder="2000"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                </form.Field>
              </div>

            </div>

          </Section>

          {/* PUBLISH AREA */}
          <section className="rounded-[26px] bg-[#19333c] p-6 text-white shadow-[0_18px_50px_rgba(25,51,60,0.12)] sm:p-8">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#79ddd8]">
                  Almost there
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                  Ready to publish?
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#b7cccf]">
                  Review your details, then publish your
                  place to add it to your HomelyHub
                  accommodations.
                </p>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-7 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06232d]/30 border-t-[#06232d]" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={17} />
                    Publish listing
                  </>
                )}
              </button>

            </div>

          </section>

        </form>

      </main>
    </div>
  );
};

export default AccomodationForm;
