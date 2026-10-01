import React, { useEffect } from "react";
import {
  ArrowLeft,
  Building2,
  Plus,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllAccomodation } from "../../store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";
import MyAccomodation from "./MyAccomodation";

const Accomodation = () => {
  const dispatch = useDispatch();

  const {
    accomodation = [],
    loading,
  } = useSelector(
    (state) => state.accomodation
  );

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

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
              to="/accomodation"
              className="text-[13px] font-bold text-[#0abab5]"
            >
              List your place
            </Link>
          </nav>

          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-full border border-[#dfe7e8] px-3 py-1.5 text-sm font-semibold text-[#19333c] transition hover:border-[#0abab5]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e2f5f3] text-xs font-bold text-[#087c7a]">
              U
            </span>

            <span className="hidden md:block">
              Profile
            </span>
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1240px] px-5 pb-20 pt-8 lg:px-8">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        {/* PAGE HEADING */}
        <section className="mb-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
                Host with HomelyHub
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
                Your places.
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
                Manage the stays you host and keep your property
                information up to date.
              </p>
            </div>

            <Link
              to="/accomodationform"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc]"
            >
              <Plus size={17} />
              Add new place
            </Link>

          </div>

        </section>

        {/* QUICK INFO */}
       <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[22px] border border-[#dfe8e7] bg-white p-5 shadow-[0_8px_25px_rgba(25,51,60,0.05)]">
            <Building2
              size={20}
              className="text-[#0abab5]"
            />

            <p className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#19333c]">
              {accomodation.length}
            </p>

            <p className="mt-1 text-sm text-[#71878d]">
              {accomodation.length === 1
                ? "Listed place"
                : "Listed places"}
            </p>
          </div>

          <div className="rounded-[22px] border border-[#dfe8e7] bg-white p-5 shadow-[0_8px_25px_rgba(25,51,60,0.05)]">
            <Sparkles
              size={20}
              className="text-[#0abab5]"
            />

            <p className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#19333c]">
              Simple
            </p>

            <p className="mt-1 text-sm text-[#71878d]">
              Manage your properties
            </p>
          </div>

          <div className="rounded-[22px] border border-[#dfe8e7] bg-white p-5 shadow-[0_8px_25px_rgba(25,51,60,0.05)]">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dff7f5] text-[#087c7a]">
              ✓
            </div>

            <p className="mt-4 text-2xl font-black tracking-[-0.04em] text-[#19333c]">
              Live
            </p>

            <p className="mt-1 text-sm text-[#71878d]">
              Your dashboard
            </p>
          </div>

        </section>

        {/* ACCOMMODATIONS */}
        {loading ? (
          <section className="flex min-h-[350px] items-center justify-center rounded-[28px] border border-[#dfe8e7] bg-white shadow-[0_10px_35px_rgba(25,51,60,0.05)]">
            <div className="text-center">
              <LoadingSpinner />

              <p className="mt-4 text-sm font-medium text-[#71878d]">
                Loading your places...
              </p>
            </div>
          </section>
        ) : accomodation.length === 0 ? (
          <section className="rounded-[28px] border border-[#dfe8e7] bg-white px-6 py-20 text-center shadow-[0_10px_35px_rgba(25,51,60,0.05)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7f8f6]">
              <Building2
                size={28}
                className="text-[#0abab5]"
              />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.03em]">
              No places listed yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#71878d]">
              Add your first place and start building your
              HomelyHub accommodation listing.
            </p>

            <Link
              to="/accomodationform"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-extrabold text-[#06232d] transition hover:bg-[#28d2cc]"
            >
              <Plus size={16} />
              List your first place
            </Link>

          </section>
        ) : (
          <section>

            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#73a3a5]">
                  Your listings
                </p>

                <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.035em]">
                  Manage your places
                </h2>
              </div>

              <span className="text-sm font-semibold text-[#71878d]">
                {accomodation.length}{" "}
                {accomodation.length === 1
                  ? "place"
                  : "places"}
              </span>
            </div>

            {/* Existing real accommodation component */}
            <div className="rounded-[28px] border border-[#dfe8e7] bg-white p-5 shadow-[0_10px_35px_rgba(25,51,60,0.05)] sm:p-7">
              <MyAccomodation
                accomodation={accomodation}
                loading={loading}
              />
            </div>

          </section>
        )}

      </main>
    </div>
  );
};

export default Accomodation;