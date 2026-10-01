
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/EditProfile";
import Wishlist from "./components/user/Wishlist";

import PropertyListing from "./components/propertyListing/PropertyListing";

import Accomodation from "./components/accomodation/Accomodation";
import AccomodationForm from "./components/accomodation/AccomodationForm";

import MyBookings from "./components/myBookings/MyBookings";
import BookingDetails from "./components/myBookings/BookingDetails";

import ForgetPassword from "./components/user/ForgetPassword";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";

import Payment from "./components/payment/Payment";

import AiTripPlanner from "./components/aiTripPlanner/AiTripPlanner";

import NotFound from "./components/NotFound";

import { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { userActions } from "./store/User/User-Slice";
import { currentUser } from "./store/User/User-Action";
import ManusHome from "./pages/ManusHome";
import AllStays from "./pages/AllStays";
function App() {
  const dispatch = useDispatch();

  const { errors, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearErrors());
    }
  }, [errors, dispatch]);

  return (
    <div className="App">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />

      <Router>
        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<ManusHome />}
          />
          
<Route path="/stays" element={<AllStays />} />

          {/* AUTH */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* PROPERTY */}
          <Route
            path="/propertylist/:id"
            element={<PropertyListing />}
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/editprofile"
            element={
              user ? <EditProfile /> : <Navigate to="/login" />
            }
          />

          {/* WISHLIST */}
         <Route
  path="/wishlist"
  element={<Wishlist />}
/>

<Route
  path="/user/wishlist"
  element={<Wishlist />}
/>

          {/* TRIP GENIE */}
          <Route
            path="/ai-trip-planner"
            element={<AiTripPlanner />}
          />

          {/* ACCOMMODATION */}
          <Route
            path="/accomodation"
            element={<Accomodation />}
          />

          <Route
            path="/accomodationform"
            element={<AccomodationForm />}
          />

          {/* PASSWORD */}
          <Route
            path="/user/forgotPassword"
            element={<ForgetPassword />}
          />

          <Route
            path="/user/resetPassword/:token"
            element={<ResetPassword />}
          />

          <Route
            path="/user/updatepassword"
            element={
              user ? (
                <UpdatePassword />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* BOOKINGS */}
          <Route
            path="/user/mybookings"
            element={
              user ? (
                <MyBookings />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/user/mybookings/:bookingId"
            element={
              user ? (
                <BookingDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* PAYMENT */}
          <Route
            path="/payment/:propertyId"
            element={
              user ? (
                <Payment />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;