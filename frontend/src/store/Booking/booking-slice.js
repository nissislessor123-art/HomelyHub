//to manage the booking
//create slice
//store all bookings 
//store individual bookings details
//track the api loading status also
//add new booking when booking is created
//update the booking data when received from backend

import {createSlice} from "@reduxjs/toolkit";
 
const initialState = {
    bookings:[],
    bookingDetails:[],
    loading:false,
}

const bookingSlice = createSlice({
     name:"booking",
     initialState,
     reducers:{
        setBookingRequest(state){
            state.loading=true;
        },
        //stores the bookings received from the api
        setBookings(state,action){
            state.bookings=action.payload;
            state.loading=false;
        },
        addBooking:(state,action)=>{
            state.bookings.push(action.payload);

        },
        setBookingDetails:(state,action)=>{
            state.bookingDetails=action.payload.bookings;
        }
     }
})
export const {setBookings,addBooking,setBookingDetails} = bookingSlice.actions;
export default bookingSlice;


