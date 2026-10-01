import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getSignup } from "../../store/User/User-Action";
import { userActions } from "../../store/User/User-Slice";
import LoadingSpinner from "../LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    errors,
    loading,
  } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    name,
    email,
    password,
    passwordConfirm,
    phoneNumber,
  } = user;

  const onChange = (e) => {
    setUser((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !phoneNumber
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(getSignup(user));
  };

  useEffect(() => {
    if (errors) {
      toast.error(
        Array.isArray(errors)
          ? errors.join(", ")
          : errors
      );

      dispatch(userActions.clearErrors());
    } else if (isAuthenticated) {
      toast.success("Account created successfully");
      navigate("/");
    }
  }, [
    isAuthenticated,
    errors,
    navigate,
    dispatch,
  ]);

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
              Creating your account...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">

      {/* HEADER */}
      <header className="border-b border-[#dfe7e8] bg-white">
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
            to="/login"
            className="flex items-center gap-2 text-sm font-bold text-[#60767a] transition hover:text-[#19333c]"
          >
            <ArrowLeft size={15} />
            Log in
          </Link>

        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1180px] items-center gap-10 px-5 py-10 lg:grid-cols-[1fr_470px] lg:px-8">

        {/* LEFT */}
        <section className="hidden lg:block">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Join HomelyHub
          </p>

          <h1 className="mt-3 max-w-[650px] text-6xl font-black leading-[0.95] tracking-[-0.07em] text-[#102d3a]">
            Make every
            <br />
            stay feel
            <br />
            <span className="text-[#59bdb9]">
              a little more yours.
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-7 text-[#6d8185]">
            Create your HomelyHub account to save stays,
            manage bookings, build trips, and keep everything
            in one place.
          </p>

          <div className="mt-9 max-w-[520px] space-y-3">

            <div className="flex items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-white p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f7f5] text-[#087c7a]">
                <Check size={17} />
              </span>

              <span className="text-sm font-semibold text-[#4f676d]">
                Save your favourite stays
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-white p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f7f5] text-[#087c7a]">
                <Check size={17} />
              </span>

              <span className="text-sm font-semibold text-[#4f676d]">
                Manage all your bookings
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#dfe8e7] bg-white p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5f7f5] text-[#087c7a]">
                <Check size={17} />
              </span>

              <span className="text-sm font-semibold text-[#4f676d]">
                Plan trips with Trip Genie
              </span>
            </div>

          </div>

        </section>

        {/* SIGNUP CARD */}
        <section className="w-full">

          <div className="rounded-[28px] border border-[#dfe8e7] bg-white p-6 shadow-[0_20px_60px_rgba(25,51,60,0.09)] sm:p-8">

            <div className="mb-7">

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#359c99]">
                Create account
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#102d3a]">
                Join HomelyHub
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#71878d]">
                Create your account and start planning your next stay.
              </p>

            </div>

            <form
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >

              {/* NAME */}
              <div>
                <label
                  htmlFor="name_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Full name
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                  <UserRound
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type="text"
                    id="name_field"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={onChange}
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* EMAIL */}
              <div className="mt-4">

                <label
                  htmlFor="email_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Email
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                  <Mail
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type="email"
                    id="email_field"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={onChange}
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-4">

                <label
                  htmlFor="password_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Password
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                  <LockKeyhole
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password_field"
                    name="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={onChange}
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="text-[#839497] hover:text-[#19333c]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mt-4">

                <label
                  htmlFor="passwordConfirm_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Confirm password
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                  <LockKeyhole
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    id="passwordConfirm_field"
                    name="passwordConfirm"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={onChange}
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) => !current
                      )
                    }
                    className="text-[#839497] hover:text-[#19333c]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirmation password"
                        : "Show confirmation password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* PHONE */}
              <div className="mt-4">

                <label
                  htmlFor="phoneNumber_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Phone number
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                  <Phone
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type="tel"
                    id="phoneNumber_field"
                    name="phoneNumber"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={onChange}
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* SUBMIT */}
              <button
                id="register_button"
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98]"
              >
                Create account
                <ArrowLeft
                  size={16}
                  className="rotate-180"
                />
              </button>

            </form>

            {/* LOGIN */}
            <div className="mt-6 border-t border-[#edf1f1] pt-6 text-center">

              <p className="text-sm text-[#71878d]">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-[#dfe7e8] px-5 py-2.5 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
              >
                Log in
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Signup;
