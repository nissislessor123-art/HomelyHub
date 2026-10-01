import {axiosInstance} from "../../utils/axios";
import {setBookingDetails,setBookings} from "./booking-slice"
//fetch booking details
export const fetchBookingDetails= (bookingId) => async(dispatch)=>{
    try{
        const response =await axiosInstance.get(`/v1/rent/user/booking/${bookingId}`)
        console.log("received successfully")
        dispatch(setBookingDetails(response.data.data));


    }catch(error){
        console.error("error fetching booking details",error)
    }
}

//fetch the user bookings
export const FetchUserBookings = ()=> async (dispatch)=>{
    try{
       const response =await axiosInstance.get("/v1/rent/user/booking")
       dispatch(setBookings(response.data.data.bookings))
    }catch(error){
       console.error("error fetching bookings",error)
    }
}