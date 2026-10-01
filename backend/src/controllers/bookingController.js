// create order booking
// verify payment
// to see trip
// to see details

import { Property } from "../Models/propertyModel.js";
import { booking } from "../Models/bookingModel.js";

// booking property create
const createOrder = async (req, res) => {
  try {
    const {
      amount,
      propertyId,
      fromDate,
      toDate,
      guests,
    } = req.body;

   const testOrderId = `TEST_${propertyId}_${Date.now()}`;

    res.status(200).json({
      success: true,
      message: "Test payment order created successfully",
      orderId: testOrderId,
      amount: Number(amount),
      currency: "INR",
      propertyId,
      fromDate,
      toDate,
      guests,
    });
  } catch (error) {
    console.error("Test order creation error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to create test payment order",
    });
  }
};


// verify payment and block dates for user
const verifyPayment = async (req, res) => {
  try {
    const {
      orderId,
      bookingDetails,
      paymentMethod,
    } = req.body;

    if (!orderId || !bookingDetails) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    // Check that this is one of our test orders
      if (!orderId.startsWith("TEST_")) {
      return res.status(400).json({
        success: false,
        message: "Invalid test payment order",
      });
    }

    // Create simulated payment ID
    const paymentId = `TEST_PAY_${Date.now()}`;

    // Create booking
    const newbooking = await booking.create({
      user: req.user._id,
      property: bookingDetails.propertyId,
      price: bookingDetails.price,
      fromDate: bookingDetails.fromDate,
      toDate: bookingDetails.toDate,
      guests: bookingDetails.guests,
      numberOfNights: bookingDetails.nights,
      paid: true,
    });

    // Mark dates as booked
    await Property.findByIdAndUpdate(
      bookingDetails.propertyId,
      {
        $push: {
          currentBookings: {
            bookingId: newbooking._id,
            fromDate: bookingDetails.fromDate,
            toDate: bookingDetails.toDate,
            userId: req.user._id,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message:
        "Test payment successful and booking confirmed",
      paymentId,
      orderId,
      paymentMethod: paymentMethod || "Test Card",
      booking: newbooking,
    });

  } catch (error) {
    console.error(
      "Test payment verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message || "Test payment failed",
    });
  }
};


// get my bookings
const getUserBookings = async (req, res) => {
  try {
    console.log(
      "GET BOOKINGS USER:",
      req.user._id
    );

    const bookings = await booking
      .find({ user: req.user._id })
      .populate({
        path: "property",
        select:
          "maximumguest images propertyname address",
      });

    console.log("BOOKINGS FOUND:", bookings);

    res.status(200).json({
      status: "success",
      data: {
        bookings,
      },
    });

  } catch (error) {
    console.log(
      "GET BOOKINGS ERROR:",
      error.message
    );

    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};


// get one booking details
const getBookingDetails = async (req, res) => {
  try {
    const bookings = await booking.findById(
      req.params.bookingId
    );

    res.status(200).json({
      status: "success",
      data: {
        bookings,
      },
    });

  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error.message,
    });
  }
};


export {
  getBookingDetails,
  getUserBookings,
  createOrder,
  verifyPayment,
};