import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Edit3,
  UserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";

import { updateUser } from "../../store/User/User-Action";
import { userActions } from "../../store/User/User-Slice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, errors, loading } = useSelector(
    (state) => state.user
  );

  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || ""
  );

  const originalUserData = {
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    avatar: user?.avatar?.url || "",
  };

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      avatar: user?.avatar?.url || "",
    },

    onSubmit: async ({ value }) => {
      const updatedFields = {};

      if (value.name !== originalUserData.name) {
        updatedFields.name = value.name;
      }

      if (
        value.phoneNumber !==
        originalUserData.phoneNumber
      ) {
        updatedFields.phoneNumber =
          value.phoneNumber;
      }

      if (
        value.avatar !==
        originalUserData.avatar
      ) {
        updatedFields.avatar = value.avatar;
      }

      if (Object.keys(updatedFields).length === 0) {
        toast("No changes made");
        return;
      }

      try {
        await dispatch(updateUser(updatedFields));

        toast.success("Profile updated successfully");

        navigate("/profile");
      } catch (error) {
        console.error(
          "Profile update failed:",
          error
        );
      }
    },
  });

  const onChangeAvatar = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        const result = reader.result;

        setAvatarPreview(result);

        form.setFieldValue("avatar", result);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (errors) {
      toast.error(
        Array.isArray(errors)
          ? errors.join(", ")
          : errors
      );

      dispatch(userActions.clearErrors());

      return;
    }

    if (user) {
      form.setFieldValue(
        "name",
        user.name || ""
      );

      form.setFieldValue(
        "phoneNumber",
        user.phoneNumber || ""
      );

      const currentAvatar =
        user.avatar?.url || "";

      form.setFieldValue(
        "avatar",
        currentAvatar
      );

      setAvatarPreview(currentAvatar);
    }
  }, [user, errors, dispatch]);

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
            Account
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
            Edit profile
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-[#6d8185]">
            Update your name, phone number, or profile photo.
          </p>

        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

            {/* PROFILE PHOTO */}
            <section className="rounded-[26px] bg-[#19333c] p-7 text-white shadow-[0_15px_40px_rgba(25,51,60,0.10)]">

              <div className="flex flex-col items-center text-center">

                <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white/15 bg-[#59bdb9] text-3xl font-black text-[#102d3a]">

                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    (user?.name || "U")
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}

                  <label
                    htmlFor="avatarupdate"
                    className="absolute bottom-2 right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0abab5] text-[#06232d] shadow-lg transition hover:bg-[#28d2cc]"
                    title="Change photo"
                  >
                    <Camera size={16} />
                  </label>

                </div>

                <h2 className="mt-5 text-xl font-extrabold">
                  {user?.name || "Your profile"}
                </h2>

                <p className="mt-1 text-sm text-[#b7cacc]">
                  Profile photo
                </p>

                <input
                  type="file"
                  id="avatarupdate"
                  accept="image/*"
                  className="hidden"
                  onChange={onChangeAvatar}
                />

              </div>

            </section>

            {/* FORM */}
            <section className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_12px_38px_rgba(25,51,60,0.06)] sm:p-8">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e5f7f5]">
                  <Edit3
                    size={18}
                    className="text-[#087c7a]"
                  />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold">
                    Your details
                  </h2>

                  <p className="mt-1 text-sm text-[#71878d]">
                    Keep your information up to date.
                  </p>
                </div>

              </div>

              {/* NAME */}
              <form.Field name="name">
                {(field) => (
                  <div className="mt-7">
                    <label
                      htmlFor="name_field"
                      className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                    >
                      Full name
                    </label>

                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 focus-within:border-[#0abab5]">

                      <UserRound
                        size={17}
                        className="text-[#0abab5]"
                      />

                      <input
                        type="text"
                        id="name_field"
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value
                          )
                        }
                        className="w-full border-0 bg-transparent text-sm font-semibold text-[#19333c] outline-none"
                      />

                    </div>
                  </div>
                )}
              </form.Field>

              {/* PHONE */}
              <form.Field name="phoneNumber">
                {(field) => (
                  <div className="mt-5">

                    <label
                      htmlFor="phone_field"
                      className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]"
                    >
                      Phone number
                    </label>

                    <input
                      type="tel"
                      id="phone_field"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-[#dfe8e7] bg-[#fbfdfd] px-4 py-3.5 text-sm font-semibold text-[#19333c] outline-none transition focus:border-[#0abab5]"
                      placeholder="Enter phone number"
                    />

                  </div>
                )}
              </form.Field>

              {/* EMAIL - READ ONLY */}
              <div className="mt-5">

                <label className="text-xs font-bold uppercase tracking-[0.13em] text-[#8ea0a4]">
                  Email address
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="mt-2 w-full rounded-xl border border-[#e5eceb] bg-[#f5f8f8] px-4 py-3.5 text-sm font-semibold text-[#71878d] outline-none"
                />

                <p className="mt-2 text-xs text-[#91a0a3]">
                  Email is managed through your account.
                </p>

              </div>

              {/* ACTIONS */}
              <div className="mt-8 flex flex-col gap-3 border-t border-[#edf1f1] pt-6 sm:flex-row">

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.18)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06232d]/30 border-t-[#06232d]" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      Save changes
                    </>
                  )}
                </button>

                <Link
                  to="/profile"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#dfe7e8] bg-white px-5 py-3.5 text-sm font-bold text-[#19333c] transition hover:border-[#0abab5]"
                >
                  Cancel
                </Link>

              </div>

            </section>

          </div>
        </form>

      </main>
    </div>
  );
};

export default EditProfile;
