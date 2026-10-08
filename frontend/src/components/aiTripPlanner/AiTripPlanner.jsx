import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Compass,
  Coffee,
  Heart,
  History,
  MapPin,
  Mountain,
  Moon,
  PartyPopper,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  Utensils,
  Users,
  Waves,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getTripPlan } from "../../ai/tripPlanner";

const INTEREST_OPTIONS = [
  {
    name: "Beach",
    icon: Waves,
  },
  {
    name: "Food",
    icon: Utensils,
  },
  {
    name: "Nightlife",
    icon: Moon,
  },
  {
    name: "Nature",
    icon: Sun,
  },
  {
    name: "Adventure",
    icon: Mountain,
  },
  {
    name: "Shopping",
    icon: ShoppingBag,
  },
  {
    name: "History",
    icon: History,
  },
  {
    name: "Relaxation",
    icon: Coffee,
  },
];

const AiTripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [people, setPeople] = useState("");
  const [interests, setInterests] = useState([]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const toggleInterest = (interest) => {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!destination || !budget || !days || !people) {
      toast.error("Please fill in all the fields");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = await getTripPlan({
        destination,
        budget,
        days,
        people,
        interests,
      });

      setResult(data);
     

      toast.success("Your trip plan is ready");

      setTimeout(() => {
        document
          .getElementById("trip-results")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not create a trip plan, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">

      {/* =====================================================
          HEADER
      ===================================================== */}
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
              className="text-[13px] font-semibold text-[#587078] transition hover:text-[#0abab5]"
            >
              Stays
            </Link>

            <Link
              to="/ai-trip-planner"
              className="text-[13px] font-bold text-[#0abab5]"
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
              <Heart
                size={18}
                strokeWidth={1.8}
              />
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

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#102d3a] text-white">

        <div className="absolute -right-20 top-[-100px] h-[300px] w-[300px] rounded-full bg-[#0abab5]/15 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-80px] h-[280px] w-[280px] rounded-full bg-[#0abab5]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1240px] px-5 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-20">

          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#9dbabd] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to stays
          </Link>

          <div className="max-w-[760px]">

            <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.19em] text-[#8de6e1]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0abab5]/20">
                <Sparkles size={14} />
              </span>

              Your personal travel sidekick
            </div>

            <h1 className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.92] tracking-[-0.075em]">
              Meet Trip
              <br />
              <span className="text-[#0abab5]">
                Genie.
              </span>
            </h1>

            <p className="mt-7 max-w-[620px] text-base leading-7 text-[#bad0d2] lg:text-lg">
              Tell us where you want to go, how long you
              have, what you want to spend, and what makes
              a trip feel like yours.
            </p>

          </div>

          <div className="mt-10 flex flex-wrap gap-3">

            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-[#c1d7d9]">
              <Sparkles size={14} className="text-[#0abab5]" />
              AI-powered itinerary
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-[#c1d7d9]">
              <MapPin size={14} className="text-[#0abab5]" />
              Real HomelyHub stays
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-[#c1d7d9]">
              <Heart size={14} className="text-[#0abab5]" />
              Built around you
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PLANNER
      ===================================================== */}
      <main className="mx-auto max-w-[1240px] px-5 py-12 lg:px-8 lg:py-16">

        <section className="-mt-24 relative z-10 rounded-[28px] border border-[#dfe8e7] bg-white p-6 shadow-[0_24px_70px_rgba(13,43,53,0.12)] sm:p-8 lg:p-10">

          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#359c99]">
                Build your escape
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#102d3a]">
                Tell Genie what you want.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#71878d]">
                A few details are all it needs to create
                your itinerary.
              </p>
            </div>

            <div className="hidden rounded-full bg-[#edf8f7] px-4 py-2 text-xs font-bold text-[#087c7a] md:block">
              {interests.length}{" "}
              {interests.length === 1
                ? "interest"
                : "interests"}{" "}
              selected
            </div>

          </div>

          <form onSubmit={handleGenerate}>

            {/* BASIC DETAILS */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

              {/* DESTINATION */}
              <div>
                <label
                  htmlFor="destination"
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]"
                >
                  Destination
                </label>

                <div className="mt-2 flex h-14 items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 transition focus-within:border-[#0abab5]">

                  <MapPin
                    size={18}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    id="destination"
                    type="text"
                    placeholder="Goa"
                    value={destination}
                    onChange={(e) =>
                      setDestination(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* BUDGET */}
              <div>
                <label
                  htmlFor="budget"
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]"
                >
                  Budget
                </label>

                <div className="mt-2 flex h-14 items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 transition focus-within:border-[#0abab5]">

                  <span className="text-sm font-bold text-[#0abab5]">
                    ₹
                  </span>

                  <input
                    id="budget"
                    type="number"
                    min="0"
                    placeholder="15,000"
                    value={budget}
                    onChange={(e) =>
                      setBudget(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* DAYS */}
              <div>
                <label
                  htmlFor="days"
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]"
                >
                  Days
                </label>

                <div className="mt-2 flex h-14 items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 transition focus-within:border-[#0abab5]">

                  <CalendarDays
                    size={18}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    id="days"
                    type="number"
                    min="1"
                    placeholder="3"
                    value={days}
                    onChange={(e) =>
                      setDays(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* PEOPLE */}
              <div>
                <label
                  htmlFor="people"
                  className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]"
                >
                  People
                </label>

                <div className="mt-2 flex h-14 items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 transition focus-within:border-[#0abab5]">

                  <Users
                    size={18}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    id="people"
                    type="number"
                    min="1"
                    placeholder="2"
                    value={people}
                    onChange={(e) =>
                      setPeople(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

            </div>

            {/* INTERESTS */}
            <div className="mt-8">

              <div className="flex items-center justify-between gap-3">

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8da0a4]">
                    Interests
                  </label>

                  <p className="mt-1 text-sm text-[#71878d]">
                    Pick anything that sounds like you.
                  </p>
                </div>

                <span className="text-xs font-bold text-[#087c7a] md:hidden">
                  {interests.length} selected
                </span>

              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">

                {INTEREST_OPTIONS.map((interest) => {
                  const Icon = interest.icon;

                  const picked =
                    interests.includes(
                      interest.name
                    );

                  return (
                    <button
                      type="button"
                      key={interest.name}
                      onClick={() =>
                        toggleInterest(
                          interest.name
                        )
                      }
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                        picked
                          ? "border-[#0abab5] bg-[#dff7f5] text-[#087c7a]"
                          : "border-[#dfe7e8] bg-white text-[#667d82] hover:border-[#a9dedd] hover:text-[#087c7a]"
                      }`}
                    >

                      <Icon
                        size={16}
                        strokeWidth={1.8}
                      />

                      {interest.name}

                    </button>
                  );
                })}

              </div>

            </div>

            {/* SUBMIT */}
            <div className="mt-9 flex flex-col gap-3 border-t border-[#edf1f1] pt-7 sm:flex-row sm:items-center sm:justify-between">

              <div className="hidden items-center gap-2 text-xs font-medium text-[#819397] sm:flex">
                <Check
                  size={14}
                  className="text-[#0abab5]"
                />
                We'll tailor the plan to your budget.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-7 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06232d]/30 border-t-[#06232d]" />
                    Planning your trip...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate my trip
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

            </div>

          </form>

        </section>

        {/* LOADING */}
        {loading && (
          <section className="mt-10 rounded-[26px] border border-[#dfe8e7] bg-white p-10 text-center shadow-[0_12px_38px_rgba(25,51,60,0.06)]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e3f7f5]">
              <Sparkles
                size={25}
                className="animate-pulse text-[#0abab5]"
              />
            </div>

            <h3 className="mt-5 text-xl font-extrabold">
              Genie is working its magic.
            </h3>

            <p className="mt-2 text-sm text-[#71878d]">
              Building an itinerary around your preferences...
            </p>

          </section>
        )}

        {/* =================================================
            RESULTS
        ================================================= */}
        {result && (
          <section
            id="trip-results"
            className="mt-12"
          >

            {/* SUMMARY */}
            <div className="rounded-[28px] bg-[#19333c] p-7 text-white sm:p-9">

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#78ddd8]">
                    Your personalized escape
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">
                    Your {days}-day trip to{" "}
                    <span className="text-[#0abab5]">
                      {destination}
                    </span>
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    {days} days
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    {people} people
                  </span>

                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    ₹{budget}
                  </span>

                </div>

              </div>

              <p className="mt-6 max-w-[800px] text-sm leading-7 text-[#bdd0d2]">
                {result.plan.summary}
              </p>

            </div>

            {/* DAYS */}
            <div className="mt-8">

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#73a3a5]">
                    Your itinerary
                  </p>

                  <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.035em]">
                    A day-by-day plan.
                  </h3>
                </div>

              </div>

              <div className="grid gap-5 lg:grid-cols-2">

                {result.plan.days.map((day) => (
                  <article
                    className="rounded-[24px] border border-[#dfe8e7] bg-white p-6 shadow-[0_10px_35px_rgba(25,51,60,0.05)]"
                    key={day.day}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <span className="rounded-full bg-[#e4f7f5] px-3 py-1.5 text-xs font-bold text-[#087c7a]">
                        Day {day.day}
                      </span>

                      <Compass
                        size={18}
                        className="text-[#0abab5]"
                      />

                    </div>

                    <h4 className="mt-5 text-xl font-extrabold tracking-[-0.025em]">
                      {day.title}
                    </h4>

                    <ul className="mt-5 space-y-3">

                      {day.activities.map(
                        (activity, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-sm leading-6 text-[#667c81]"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0abab5]" />
                            {activity}
                          </li>
                        )
                      )}

                    </ul>

                  </article>
                ))}

              </div>

            </div>
            {/* LIVE LOCAL DISCOVERIES - SERPAPI */}
{result.livePlaces?.length > 0 && (
  <div className="mt-10">

    <div className="mb-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#73a3a5]">
        Live local discovery
      </p>

      <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.035em]">
        Places worth exploring.
      </h3>

      <p className="mt-2 text-sm text-[#71878d]">
        Real-time local results found using SerpApi and matched to your trip.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {result.livePlaces.map((place, index) => (
        <article
  key={index}
  className="group overflow-hidden rounded-[24px] border border-[#dfe8e7] bg-white shadow-[0_10px_35px_rgba(25,51,60,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(25,51,60,0.10)]"
>
  {/* IMAGE */}
  <div className="relative h-48 overflow-hidden bg-[#dfe9e9]">
   {place.thumbnail ? (
      <img
       src={`/api/v1/rent/trip/image?url=${encodeURIComponent(place.thumbnail)}`}
        alt={place.name}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
      />
    ) : (
      <div className="flex h-full items-center justify-center">
  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 text-3xl font-black text-[#087c7a] shadow-sm">
    {place.name?.charAt(0)?.toUpperCase()}
  </div>
</div>
    )}

    {/* LIVE BADGE */}
    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087c7a] shadow-sm">
      Live discovery
    </div>

    {/* RATING */}
    {place.rating && (
      <div className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1.5 text-xs font-extrabold text-[#19333c] shadow-sm">
        ★ {place.rating}
      </div>
    )}
  </div>

  {/* CONTENT */}
  <div className="p-5">

    {/* TYPE */}
    {place.type && (
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#359c99]">
        {place.type}
      </p>
    )}

    {/* NAME */}
    <h4 className="mt-1 text-lg font-extrabold leading-tight tracking-[-0.02em] text-[#19333c]">
      {place.name}
    </h4>

    {/* ADDRESS */}
    {place.address && (
      <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#71878d]">
        <MapPin
          size={14}
          className="mt-0.5 shrink-0 text-[#0abab5]"
        />
        <span>{place.address}</span>
      </p>
    )}

    {/* RATING + REVIEWS */}
    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#587078]">
      {place.rating && (
        <span className="rounded-full bg-[#e4f7f5] px-2.5 py-1 text-[#087c7a]">
          ★ {place.rating}
        </span>
      )}

      {place.reviews && (
        <span>
          {place.reviews.toLocaleString()} reviews
        </span>
      )}

      {place.openState && (
        <span className="text-[#087c7a]">
          · {place.openState}
        </span>
      )}
    </div>

    {/* DESCRIPTION */}
    {place.description && (
      <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#71878d]">
        {place.description}
      </p>
    )}

    {/* FOOTER */}
    <div className="mt-5 flex items-center justify-between border-t border-[#edf1f1] pt-4">

      <span className="text-[11px] font-semibold text-[#91a3a7]">
        Found via Google Maps
      </span>

    <a
  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place.name} ${place.address || ""}`
  )}`}
  target="_blank"
  rel="noreferrer"
  className="text-xs font-extrabold text-[#087c7a] transition hover:text-[#a0bab5]"
>
  View on Maps →
</a>
    </div>
  </div>
</article>
      ))}

    </div>

    <p className="mt-4 text-xs text-[#8da0a4]">
      Live results powered by SerpApi.
    </p>

  </div>
)}
            

            {/* TIPS */}
            {result.plan.tips &&
              result.plan.tips.length > 0 && (
                <section className="mt-8 rounded-[24px] border border-[#d8ecea] bg-[#e8f7f5] p-6 sm:p-7">

                  <div className="flex items-center gap-3">

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0abab5]">
                      <Sparkles size={18} />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold">
                        Good to know
                      </h3>

                      <p className="mt-1 text-sm text-[#71878d]">
                        A few extra tips from Genie.
                      </p>
                    </div>

                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">

                    {result.plan.tips.map(
                      (tip, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-2xl bg-white p-4"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-[#0abab5]"
                          />

                          <p className="text-sm leading-6 text-[#5e7479]">
                            {tip}
                          </p>
                        </div>
                      )
                    )}

                  </div>

                </section>
              )}

            {/* STAYS */}
            <section className="mt-10">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

                <div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#73a3a5]">
                    Handpicked for you
                  </p>

                  <h3 className="mt-1 text-3xl font-black tracking-[-0.045em]">
                    Stays in {destination}
                  </h3>

                  <p className="mt-2 text-sm text-[#71878d]">
                    Within your nightly budget of ₹
                    {Math.round(result.perNight)}
                  </p>

                </div>

              </div>

              {result.properties.length === 0 ? (
                <div className="mt-6 rounded-[24px] border border-[#dfe8e7] bg-white p-10 text-center">

                  <Search
                    size={28}
                    className="mx-auto text-[#0abab5]"
                  />

                  <h4 className="mt-4 text-xl font-extrabold">
                    No matching stays yet
                  </h4>

                  <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#71878d]">
                    We do not have a stay in{" "}
                    {destination} inside this budget yet.
                    Try a higher budget or fewer days.
                  </p>

                </div>
              ) : (
                <div className="mt-7 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">

                  {result.properties.map(
                    (property) => {

                      const image =
                        property.images?.[0]?.url ||
                        property.images?.[0] ||
                        "/assets/default-property.jpg";

                      return (
                        <article
                          className="group overflow-hidden"
                          key={property._id}
                        >

                          <Link
                            to={`/propertylist/${property._id}`}
                            className="block"
                          >

                            <div className="relative aspect-[1.18] overflow-hidden rounded-[18px] bg-[#dfe9e9]">

                              <img
                                src={image}
                                alt={
                                  property.propertyName
                                }
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.045]"
                              />

                              <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold text-[#24434d] shadow-sm">
                                Recommended
                              </div>

                            </div>

                            <div className="pt-3">

                              <div className="flex items-start justify-between gap-3">

                                <div>

                                  <h4 className="text-[15px] font-extrabold tracking-[-0.015em] text-[#19333c]">
                                    {
                                      property.propertyName
                                    }
                                  </h4>

                                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#71878d]">
                                    <MapPin size={12} />
                                    {
                                      property.address
                                        ?.city
                                    }
                                    {property.address
                                      ?.state
                                      ? `, ${property.address.state}`
                                      : ""}
                                  </p>

                                </div>

                                <Heart
                                  size={16}
                                  className="text-[#91a3a7]"
                                />

                              </div>

                              <div className="mt-3 flex items-baseline justify-between">

                                <p className="text-sm text-[#637980]">
                                  <span className="text-base font-extrabold text-[#19333c]">
                                    ₹
                                    {Number(
                                      property.price ||
                                        0
                                    ).toLocaleString(
                                      "en-IN"
                                    )}
                                  </span>{" "}
                                  / night
                                </p>

                                <span className="text-xs font-bold text-[#087c7a]">
                                  View stay
                                </span>

                              </div>

                            </div>

                          </Link>

                        </article>
                      );
                    }
                  )}

                </div>
              )}

            </section>

          </section>
        )}

      </main>
    </div>
  );
};

export default AiTripPlanner;