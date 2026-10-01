import React, { useEffect } from "react";
import {
  ArrowLeft,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import { forgotPassword } from "../../store/User/User-Action";
import { userActions } from "../../store/User/User-Slice";

const ForgetPassword = () => {
  const { errors } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
    },

    onSubmit: ({ value }) => {
      if (!value.email) {
        toast.error("Please enter your email address.");
        return;
      }

      dispatch(forgotPassword(value.email));

      toast.success(
        "Reset email sent. Please check your inbox."
      );
    },
  });

  useEffect(() => {
    if (errors) {
      toast.error(
        Array.isArray(errors)
          ? errors.join(", ")
          : errors
      );

      dispatch(userActions.clearErrors());
    }
  }, [errors, dispatch]);

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
            className="inline-flex items-center gap-2 text-sm font-bold text-[#60767a] transition hover:text-[#19333c]"
          >
            <ArrowLeft size={15} />
            Back to login
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-[1180px] items-center gap-10 px-5 py-12 lg:grid-cols-[1fr_430px] lg:px-8">

        {/* LEFT */}
        <section className="hidden lg:block">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Account recovery
          </p>

          <h1 className="mt-3 max-w-[650px] text-6xl font-black leading-[0.95] tracking-[-0.07em] text-[#102d3a]">
            Let’s get you
            <br />
            back to
            <br />
            <span className="text-[#59bdb9]">
              your account.
            </span>
          </h1>

          <p className="mt-7 max-w-[520px] text-base leading-7 text-[#6d8185]">
            Enter the email connected to your HomelyHub
            account and we’ll send instructions to reset
            your password.
          </p>

          <div className="mt-9 max-w-[520px] rounded-[24px] border border-[#dfe8e7] bg-white p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f7f5]">
                <ShieldCheck
                  size={18}
                  className="text-[#087c7a]"
                />
              </div>

              <div>
                <p className="text-sm font-extrabold">
                  Secure account recovery
                </p>

                <p className="mt-1 text-sm leading-6 text-[#71878d]">
                  Your password itself is never sent by email.
                  You’ll receive a reset link instead.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* FORM CARD */}
        <section className="w-full">

          <div className="rounded-[28px] border border-[#dfe8e7] bg-white p-6 shadow-[0_20px_60px_rgba(25,51,60,0.09)] sm:p-8">

            <div className="mb-7">

              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#359c99]">
                Forgot password
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-[#102d3a]">
                Reset your password
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#71878d]">
                Enter your email and we’ll send a reset link.
              </p>

            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >

              <form.Field name="email">
                {(field) => (
                  <div>

                    <label
                      htmlFor="email_field"
                      className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                    >
                      Email address
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
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                        className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none placeholder:text-[#a1afb2]"
                      />

                    </div>

                  </div>
                )}
              </form.Field>

              <button
                id="forgot_password_button"
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98]"
              >
                <KeyRound size={16} />
                Send reset email
              </button>

            </form>

            <div className="mt-6 border-t border-[#edf1f1] pt-6 text-center">

              <p className="text-sm text-[#71878d]">
                Remember your password?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-[#dfe7e8] px-5 py-2.5 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5] hover:text-[#087c7a]"
              >
                Back to login
              </Link>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default ForgetPassword;
