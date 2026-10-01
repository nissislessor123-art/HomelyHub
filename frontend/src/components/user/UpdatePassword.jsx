import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { updatePassword } from "../../store/User/User-Action";
import { userActions } from "../../store/User/User-Slice";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordCurrent, setPasswordCurrent] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [passwordConfirm, setPasswordConfirm] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const { errors, success, loading } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (!passwordCurrent) {
      toast.error("Please enter your current password.");
      return;
    }

    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("New passwords do not match.");
      return;
    }

    dispatch(
      updatePassword({
        passwordCurrent,
        password,
        passwordConfirm,
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
    }

    if (success) {
      toast.success(
        "Password updated successfully."
      );

      dispatch(
        userActions.getPasswordSuccess(false)
      );

      navigate("/profile");
    }
  }, [
    errors,
    success,
    dispatch,
    navigate,
  ]);

  const PasswordField = ({
    label,
    value,
    setValue,
    show,
    setShow,
    id,
  }) => {
    return (
      <div className="mt-5">

        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
        >
          {label}
        </label>

        <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

          <KeyRound
            size={17}
            className="shrink-0 text-[#0abab5]"
          />

          <input
            id={id}
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShow((current) => !current)
            }
            className="text-[#809295] transition hover:text-[#19333c]"
            aria-label={`Show ${label}`}
          >
            {show ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

        </div>
      </div>
    );
  };

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
            to="/profile"
            className="text-sm font-bold text-[#587078] transition hover:text-[#0abab5]"
          >
            Profile
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[900px] px-5 pb-20 pt-9 lg:px-8">

        <Link
          to="/profile"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Back to profile
        </Link>

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#359c99]">
            Security
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
            Change password
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
            Create a new password for your HomelyHub account.
          </p>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

          {/* FORM */}
          <section className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_12px_38px_rgba(25,51,60,0.06)] sm:p-8">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f7f5]">
                <KeyRound
                  size={18}
                  className="text-[#087c7a]"
                />
              </div>

              <div>
                <h2 className="text-xl font-extrabold">
                  Password details
                </h2>

                <p className="mt-1 text-sm text-[#71878d]">
                  Enter your current password and choose a new one.
                </p>
              </div>

            </div>

            <form onSubmit={submitHandler}>

              <PasswordField
                label="Current password"
                value={passwordCurrent}
                setValue={setPasswordCurrent}
                show={showCurrent}
                setShow={setShowCurrent}
                id="old_password_field"
              />

              <PasswordField
                label="New password"
                value={password}
                setValue={setPassword}
                show={showPassword}
                setShow={setShowPassword}
                id="new_password_field"
              />

              <PasswordField
                label="Confirm new password"
                value={passwordConfirm}
                setValue={setPasswordConfirm}
                show={showConfirm}
                setShow={setShowConfirm}
                id="new_password_confirm_field"
              />

              <div className="mt-7 border-t border-[#edf1f1] pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.18)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06232d]/30 border-t-[#06232d]" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      Update password
                    </>
                  )}
                </button>

              </div>

            </form>
          </section>

          {/* SECURITY CARD */}
          <aside className="rounded-[26px] bg-[#19333c] p-7 text-white shadow-[0_15px_40px_rgba(25,51,60,0.10)]">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0abab5] text-[#06232d]">
              <ShieldCheck size={20} />
            </div>

            <h2 className="mt-6 text-xl font-extrabold">
              Keep your account secure
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#b6ccce]">
              Use a password that you don't reuse on other websites.
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">

              <p className="text-xs leading-5 text-[#89a7aa]">
                After successfully changing your password,
                you'll return to your profile.
              </p>

            </div>

          </aside>

        </div>

      </main>
    </div>
  );
};

export default UpdatePassword;