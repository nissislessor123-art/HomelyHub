// import {configureStore} from "@reduxjs/toolkit";
// import propertySlice from "./Property/property.slice";
// import propertyDetailsSlice from "./PropertyDetails/propertyDetails-Slice";
// import userReducer from "./User/User-Slice";
// import bookingSlice  from "./Booking/booking-slice";
//  const store= configureStore({
//     reducer:{
//         properties:propertySlice.reducer,
//         propertyDetails:propertyDetailsSlice.reducer,
//         user: userReducer,
//         bookings:bookingSlice.reducer
//     }
//  })

// export default store;

import { configureStore } from "@reduxjs/toolkit";

import propertySlice from "./Property/property.slice";
import propertyDetailsSlice from "./PropertyDetails/propertyDetails-Slice";
import userReducer from "./User/User-Slice";
import bookingSlice from "./Booking/booking-slice";
import accomodationSlice from "./Accomodation/Accomodation-slice";
import paymentSlice from "./Payment/payment-slice"
const store = configureStore({
  reducer: {
    properties: propertySlice.reducer,
    propertyDetails: propertyDetailsSlice.reducer,
    user: userReducer,
    bookings: bookingSlice.reducer,
    accomodation:accomodationSlice.reducer,
    payment:paymentSlice.reducer,
  },
});

export default store;