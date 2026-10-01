import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getLogin } from "../../store/User/User-Action";
import { userActions } from "../../store/User/User-Slice";
import LoadingSpinner from "../LoadingSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    errors,
    loading,
  } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    dispatch(
      getLogin({
        email,
        password,
      })
    );
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
      toast.success("User logged in successfully");
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
              Signing you in...
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
            to="/"
            className="flex items-center gap-2 text-sm font-bold text-[#60767a] transition hover:text-[#19333c]"
          >
            <ArrowLeft size={15} />
            Back home
          </Link>

        </div>
      </header>

      {/* CONTENT */}
      <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1180px] items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_430px] lg:px-8">

        {/* LEFT */}
        <section className="hidden lg:block">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Welcome back
          </p>

          <h1 className="mt-3 max-w-[650px] text-6xl font-black leading-[0.95] tracking-[-0.07em] text-[#102d3a]">
            Come back to
            <br />
            <span className="text-[#59bdb9]">
              your stays.
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-7 text-[#6d8185]">
            Sign in to manage your saved stays, bookings,
            trips, and HomelyHub profile.
          </p>

          <div className="mt-9 grid max-w-[520px] gap-3 sm:grid-cols-2">

            <div className="rounded-2xl border border-[#dfe8e7] bg-white p-4">
              <ShieldCheck
                size={19}
                className="text-[#0abab5]"
              />

              <p className="mt-3 text-sm font-extrabold">
                Your account
              </p>

              <p className="mt-1 text-xs leading-5 text-[#71878d]">
                Your bookings and saved stays stay connected
                to your profile.
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe8e7] bg-white p-4">
              <LockKeyhole
                size={19}
                className="text-[#0abab5]"
              />

              <p className="mt-3 text-sm font-extrabold">
                Secure sign in
              </p>

              <p className="mt-1 text-xs leading-5 text-[#71878d]">
                Use your HomelyHub account credentials to
                continue.
              </p>
            </div>

          </div>

        </section>

        {/* LOGIN CARD */}
        <section className="w-full">

          <div className="rounded-[28px] border border-[#dfe8e7] bg-white p-6 shadow-[0_20px_60px_rgba(25,51,60,0.09)] sm:p-8">

            <div className="mb-7">

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#359c99]">
                Account
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#102d3a]">
                Log in to HomelyHub
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#71878d]">
                Enter your details to continue.
              </p>

            </div>

            <form onSubmit={submitHandler}>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email_field"
                  className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                >
                  Email
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 transition focus-within:border-[#0abab5]">

                  <Mail
                    size={17}
                    className="shrink-0 text-[#0abab5]"
                  />

                  <input
                    type="email"
                    id="email_field"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                </div>
              </div>

              {/* PASSWORD */}
              <div className="mt-5">

                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="password_field"
                    className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                  >
                    Password
                  </label>

                  <Link
                    to="/user/forgotPassword"
                    className="text-xs font-bold text-[#087c7a] transition hover:text-[#19333c]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 transition focus-within:border-[#0abab5]">

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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="text-[#839497] transition hover:text-[#19333c]"
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

              {/* SUBMIT */}
              <button
                id="login_button"
                type="submit"
                className="mt-7 flex w-full items-center justify-center rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98]"
              >
                Log in
              </button>

            </form>

            {/* SIGNUP */}
            <div className="mt-6 border-t border-[#edf1f1] pt-6 text-center">

              <p className="text-sm text-[#71878d]">
                New to HomelyHub?
              </p>

              <Link
                to="/signup"
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-[#dfe7e8] px-5 py-2.5 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
              >
                Create an account
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default Login;
