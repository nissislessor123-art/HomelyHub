import React from "react";

import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Edit3,
  Heart,
  LogOut as LogOutIcon,
  Settings2,
  UserRound,
} from "lucide-react";

import { Link,Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import LoadingSpinner from "../LoadingSpinner";
import { logout } from "../../store/User/User-Action";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state) => state.user
  );

  if (loading) {
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
              Loading your profile...
            </p>
          </div>
        </main>
      </div>
    );
  }if (!user) {
  return <Navigate to="/login" replace />;
}

  const displayName =
    user.name ||
    user.username ||
    user.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const joinedDate = user.createdAt
    ? moment(user.createdAt).format("MMMM YYYY")
    : "Recently";

  const avatar = user.avatar?.url || "";

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

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#19333c] transition hover:bg-[#edfafa]"
              aria-label="Wishlist"
            >
              <Heart size={18} strokeWidth={1.8} />
            </Link>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe7e8] bg-white text-xs font-bold text-[#087c7a]">
              {initials}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1100px] px-5 pb-20 pt-9 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Home
        </Link>

        {/* INTRO */}
        <section className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Your HomelyHub
          </p>

          <div className="mt-1 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="text-5xl font-black tracking-[-0.06em] text-[#102d3a] sm:text-6xl">
              Hello,{" "}
              <span className="text-[#59bdb9]">
                {displayName}.
              </span>
            </h1>

            <Link
              to="/accomodation"
              className="inline-flex items-center gap-2 rounded-xl border border-[#dfe7e8] bg-white px-4 py-2.5 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
            >
              <BarChart3 size={15} />
              Owner dashboard
            </Link>
          </div>
        </section>

        {/* TABS */}
        <div className="border-b border-[#dce6e5]">
          <div className="flex gap-6">
            <Link
              to="/profile"
              className="flex items-center gap-2 border-b-2 border-[#59bdb9] px-1 pb-4 text-sm font-bold text-[#087c7a]"
            >
              <UserRound size={15} />
              My profile
            </Link>

            <Link
              to="/user/mybookings"
              className="flex items-center gap-2 px-1 pb-4 text-sm font-semibold text-[#71878d] transition hover:text-[#19333c]"
            >
              <CalendarDays size={15} />
              My bookings
            </Link>

            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-1 pb-4 text-sm font-semibold text-[#71878d] transition hover:text-[#19333c]"
            >
              <Heart size={15} />
              Wishlist
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* LEFT CARD */}
          <aside className="rounded-[24px] bg-[#19333c] p-7 text-white shadow-[0_15px_40px_rgba(25,51,60,0.10)]">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#59bdb9] text-lg font-extrabold text-[#102d3a]">
              {avatar ? (
                <img
                  src={avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <h2 className="mt-6 text-2xl font-extrabold tracking-[-0.035em]">
              {displayName}
            </h2>

            <p className="mt-1 break-all text-sm text-[#b4c8ca]">
              {user.email}
            </p>

            <div className="my-7 border-t border-white/10" />

            <p className="text-xs text-[#9eb9bc]">
              Member since {joinedDate}
            </p>
            <button
                type="button"
                onClick={() => {
                  dispatch(logout());
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
>
            <LogOutIcon size={16} />
             Log out
            </button>
          </aside>

          {/* RIGHT CARD */}
          <section className="rounded-[24px] bg-white p-7 shadow-[0_12px_38px_rgba(25,51,60,0.06)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#72a0a2]">
                  Your details
                </p>

                <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">
                  A little about you
                </h2>
              </div>

              <Link
                to="/editprofile"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087c7a] transition hover:text-[#19333c]"
              >
                <Edit3 size={14} />
                Edit
              </Link>
            </div>

            <div className="mt-7 grid gap-x-8 md:grid-cols-2">
              <div className="border-b border-[#e5eceb] py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#91a3a7]">
                  Full name
                </p>
                <p className="mt-2 text-sm font-bold text-[#19333c]">
                  {displayName}
                </p>
              </div>

              <div className="border-b border-[#e5eceb] py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#91a3a7]">
                  Email
                </p>
                <p className="mt-2 break-all text-sm font-bold text-[#19333c]">
                  {user.email}
                </p>
              </div>

              <div className="border-b border-[#e5eceb] py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#91a3a7]">
                  Phone
                </p>
                <p className="mt-2 text-sm font-bold text-[#19333c]">
                  {user.phoneNumber || "Not added"}
                </p>
              </div>

              <div className="border-b border-[#e5eceb] py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#91a3a7]">
                  Joined
                </p>
                <p className="mt-2 text-sm font-bold text-[#19333c]">
                  {joinedDate}
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-[#e8f6f4] p-5">
              <p className="text-sm leading-6 text-[#357277]">
                <span className="font-extrabold">
                  Your profile, remembered.
                </span>{" "}
                Keep your details up to date so HomelyHub can
                make your account experience smoother.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/editprofile"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3 text-sm font-extrabold text-[#06232d] transition hover:bg-[#28d2cc]"
              >
                <Edit3 size={15} />
                Edit profile
              </Link>

              <Link
                to="/user/updatepassword"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dfe7e8] bg-white px-5 py-3 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
              >
                <Settings2 size={15} />
                Change password
              </Link>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Profile;