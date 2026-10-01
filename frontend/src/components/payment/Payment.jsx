import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  initiateCheckoutSession,
  verifyPayment,
} from "../../store/Payment/payment-action";

import {
  selectPaymentDetails,
  selectPaymentStatus,
  paymentActions,
} from "../../store/Payment/payment-slice";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const [showPaymentGateway, setShowPaymentGateway] =
    useState(false);

  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    guests,
    nights,
  } = useSelector(selectPaymentDetails);

  const { loading, error, orderData } =
    useSelector(selectPaymentStatus);

  const amount = Number(totalPrice || 0);

  // Create test payment order
  const handleBooking = async () => {
    const paymentData = {
      amount: totalPrice,
      propertyId,
      fromDate: checkinDate,
      toDate: checkoutDate,
      guests,
    };

    try {
      await dispatch(
        initiateCheckoutSession(paymentData)
      );
    } catch {
      toast.error("Payment initiation failed");
    }
  };

  // Confirm simulated payment
  const handleConfirmPayment = async (paymentMethod) => {
    if (!orderData?.orderId) {
      toast.error("Payment order not found");
      return;
    }

    try {
      const result = await dispatch(
        verifyPayment({
          orderId: orderData.orderId,
          paymentMethod,

          bookingDetails: {
            propertyId,
            fromDate: checkinDate,
            toDate: checkoutDate,
            guests,
            price: totalPrice,
            nights,
          },
        })
      );

      console.log(
        "Booking confirmation response:",
        result
      );

      toast.success(
        "🎉 Payment Successful! Booking Confirmed!"
      );

      dispatch(paymentActions.resetPayment());

      navigate("/user/mybookings");
    } catch (error) {
      console.error(
        "Payment verification failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Payment failed"
      );
    }
  };

  // Cancel payment
  const handleCancelPayment = () => {
    toast.error("Payment Cancelled");
    navigate(`/propertylist/${propertyId}`);
  };

  // Show payment gateway after test order is created
  useEffect(() => {
    if (orderData && !showPaymentGateway) {
      setShowPaymentGateway(true);
    }
  }, [orderData, showPaymentGateway]);

  /*
   * =========================================================
   * TEST PAYMENT GATEWAY
   * =========================================================
   */
  if (showPaymentGateway && orderData) {
    return (
      <div className="min-h-screen bg-[#f5f9f8] text-[#19333c]">

        {/* Header */}
        <header className="border-b border-[#dfe8e7] bg-white">
          <div className="mx-auto flex h-[74px] max-w-[1100px] items-center justify-between px-5 lg:px-8">

            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold tracking-[-0.08em] text-[#06232d]">
                hh
              </span>

              <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
                HomelyHub
                <span className="text-[#0abab5]">
                  .
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2 rounded-full bg-[#e9f8f6] px-3 py-2 text-xs font-bold text-[#087c7a]">
              <Lock size={13} />
              Secure payment
            </div>
          </div>
        </header>

        {/* Gateway */}
        <main className="mx-auto max-w-[760px] px-5 py-12">

          <button
            type="button"
            onClick={handleCancelPayment}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
          >
            <ArrowLeft size={16} />
            Back to property
          </button>

          <div className="overflow-hidden rounded-[28px] border border-[#dfe8e7] bg-white shadow-[0_20px_60px_rgba(25,51,60,0.10)]">

            {/* Gateway heading */}
            <div className="bg-[#102d3a] px-6 py-7 text-white sm:px-8">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#79ddd8]">
                Payment gateway
              </p>

              <h1 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                Complete your payment
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#bad0d2]">
                Your booking details are ready. Choose a payment method to continue.
              </p>

            </div>

            <div className="p-6 sm:p-8">

              {/* Property */}
              <div className="mb-7 flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e4f7f5]">
                  <MapPin
                    size={19}
                    className="text-[#0abab5]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#91a3a7]">
                    Payment to
                  </p>

                  <h2 className="mt-1 text-lg font-extrabold text-[#19333c]">
                    {propertyName}
                  </h2>

                  {orderData?.orderId && (
                    <p className="mt-1 break-all text-xs text-[#7b8e92]">
                      Order ID: {orderData.orderId}
                    </p>
                  )}
                </div>

              </div>

    

              {/* Booking Summary */}
              <div className="rounded-2xl border border-[#e2ebea] bg-[#fbfdfd] p-5">

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#19333c]">
                    Booking summary
                  </h3>

                  <span className="rounded-full bg-[#e9f8f6] px-3 py-1 text-xs font-bold text-[#087c7a]">
                    {nights}{" "}
                    {Number(nights) === 1
                      ? "night"
                      : "nights"}
                  </span>
                </div>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-[#71878d]">
                      Property
                    </span>

                    <span className="text-right font-semibold text-[#19333c]">
                      {propertyName}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#71878d]">
                      Check-in
                    </span>

                    <span className="font-semibold text-[#19333c]">
                      {checkinDate}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#71878d]">
                      Check-out
                    </span>

                    <span className="font-semibold text-[#19333c]">
                      {checkoutDate}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#71878d]">
                      Guests
                    </span>

                    <span className="font-semibold text-[#19333c]">
                      {guests}
                    </span>
                  </div>

                  <div className="my-4 border-t border-[#e5eceb]" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#19333c]">
                        Total amount
                      </p>

                      <p className="mt-1 text-xs text-[#8a9a9d]">
                        {nights} nights
                      </p>
                    </div>

                    <span className="text-2xl font-black tracking-[-0.035em] text-[#087c7a]">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-5 rounded-xl border border-[#f2caca] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#c34f4f]">
                  {error}
                </div>
              )}

              {/* Payment Methods */}
              <div className="mt-8">

                <h3 className="text-xl font-extrabold tracking-[-0.025em] text-[#19333c]">
                  Select payment method
                </h3>

                <p className="mt-1 text-sm text-[#74878b]">
                  Choose a payment method below.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() =>
                      handleConfirmPayment("Card")
                    }
                    disabled={loading}
                    className="group flex items-center justify-between rounded-2xl border border-[#dce7e6] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#0abab5] hover:bg-[#f4fbfa] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <div className="flex items-center gap-3">

                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f7f5] text-[#087c7a]">
                        <CreditCard size={20} />
                      </span>

                      <div>
                        <p className="text-sm font-extrabold text-[#19333c]">
                          Pay by card
                        </p>

                        <p className="mt-1 text-xs text-[#839497]">
                          Secure card payment
                        </p>
                      </div>

                    </div>

                    <span className="text-[#0abab5]">
                      →
                    </span>

                  </button>

                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() =>
                      handleConfirmPayment("UPI")
                    }
                    disabled={loading}
                    className="group flex items-center justify-between rounded-2xl border border-[#dce7e6] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#0abab5] hover:bg-[#f4fbfa] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <div className="flex items-center gap-3">

                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f7f5] text-[#087c7a]">
                        <Smartphone size={20} />
                      </span>

                      <div>
                        <p className="text-sm font-extrabold text-[#19333c]">
                          Pay by UPI
                        </p>

                        <p className="mt-1 text-xs text-[#839497]">
                          Secure UPI payment
                        </p>
                      </div>

                    </div>

                    <span className="text-[#0abab5]">
                      →
                    </span>

                  </button>

                </div>

                {loading && (
                  <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#587078]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#cceceb] border-t-[#0abab5]" />
                    Processing payment...
                  </div>
                )}

              </div>

              {/* Cancel */}
              <button
                type="button"
                onClick={handleCancelPayment}
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#dfe7e8] px-4 py-3 text-sm font-bold text-[#60767a] transition hover:bg-[#f7faf9] disabled:opacity-50"
              >
                Cancel payment
              </button>

          

            </div>
          </div>

        </main>
      </div>
    );
  }

  /*
   * =========================================================
   * INITIAL PAYMENT PAGE
   * =========================================================
   */
  return (
    <div className="min-h-screen bg-[#f6faf9] text-[#19333c]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#dfe7e8]/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1180px] items-center justify-between px-5 lg:px-8">

          <Link
            to="/"
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#0abab5] text-sm font-extrabold tracking-[-0.08em] text-[#06232d]">
              hh
            </span>

            <span className="text-[19px] font-extrabold tracking-[-0.04em] text-[#10232c]">
              HomelyHub
              <span className="text-[#0abab5]">
                .
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-[#71878d]">
            <ShieldCheck
              size={15}
              className="text-[#0abab5]"
            />
            Secure booking
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-[1180px] px-5 py-10 lg:px-8 lg:py-14">

        <button
          type="button"
          onClick={() =>
            navigate(`/propertylist/${propertyId}`)
          }
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#60767a] transition hover:text-[#19333c]"
        >
          <ArrowLeft size={16} />
          Back to property
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <section>

            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#359c99]">
                Almost there
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] text-[#102d3a] sm:text-5xl">
                Complete your booking.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#6d8185]">
                Review your stay details before continuing with payment.
              </p>

            </div>

            {/* Booking details */}
            <div className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_12px_40px_rgba(25,51,60,0.06)] sm:p-8">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e4f7f5]">
                  <MapPin
                    size={20}
                    className="text-[#0abab5]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#94a5a8]">
                    Your stay
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold tracking-[-0.025em]">
                    {propertyName}
                  </h2>
                </div>

              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f7faf9] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#91a3a7]">
                    Check-in
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#19333c]">
                    {checkinDate}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7faf9] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#91a3a7]">
                    Check-out
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#19333c]">
                    {checkoutDate}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7faf9] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#91a3a7]">
                    Guests
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#19333c]">
                    {guests}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7faf9] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#91a3a7]">
                    Nights
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#19333c]">
                    {nights}
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-[95px] lg:self-start">

            <div className="rounded-[26px] border border-[#dfe8e7] bg-white p-6 shadow-[0_16px_50px_rgba(13,43,53,0.09)]">

              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#93a5a8]">
                Payment summary
              </p>

              <div className="mt-3 flex items-end justify-between gap-4">

                <div>
                  <span className="text-3xl font-black tracking-[-0.045em] text-[#19333c]">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <span className="rounded-full bg-[#e7f8f6] px-3 py-1.5 text-xs font-bold text-[#087c7a]">
                  {nights}{" "}
                  {Number(nights) === 1
                    ? "night"
                    : "nights"}
                </span>

              </div>

              <div className="my-6 border-t border-[#e8eeee]" />

              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-[#71878d]">
                    Stay
                  </span>

                  <span className="font-semibold">
                    {propertyName}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#71878d]">
                    Guests
                  </span>

                  <span className="font-semibold">
                    {guests}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#71878d]">
                    Nights
                  </span>

                  <span className="font-semibold">
                    {nights}
                  </span>
                </div>

              </div>

              <div className="my-6 border-t border-[#e8eeee]" />

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-sm font-bold">
                    Total
                  </p>

                  <p className="mt-1 text-xs text-[#87979a]">
                     payment
                  </p>
                </div>

                <p className="text-2xl font-black text-[#087c7a]">
                  ₹{amount.toLocaleString("en-IN")}
                </p>

              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-[#f2caca] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#c34f4f]">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleBooking}
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0abab5] px-5 py-3.5 text-sm font-extrabold text-[#06232d] shadow-[0_10px_24px_rgba(10,186,181,0.22)] transition hover:-translate-y-0.5 hover:bg-[#28d2cc] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#06232d]/30 border-t-[#06232d]" />
                    Creating payment...
                  </>
                ) : (
                  <>
                    Proceed to payment
                    <span>→</span>
                  </>
                )}
              </button>

              

            </div>

          </aside>

        </div>
      </main>
    </div>
  );
};

export default Payment;