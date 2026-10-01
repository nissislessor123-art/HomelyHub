import { propertyAction } from "./property.slice";
import {axiosInstance} from "../../utils/axios";
//get all the properties
//start api req
//tell reduce that locding started
// get search parameters
// call the backend api
//wait for responses
//get the property data
//send data to redux store
// if error occurs then send error to redux

export const getAllProperties =()=> async(dispatch,getState)=>{
    try{
      console.log("API call started");

      dispatch (propertyAction.getRequest())
      const {SearchParams}= getState().properties;
      console.log(SearchParams)//optinol
      const response = await axiosInstance.get(`/v1/rent/listing`,{
        params:{...SearchParams}
      })

      if(!response){
        throw new Error("could not fetch any properties")
      }
      const {data}= response;
      console.log(data);
      dispatch(propertyAction.getProperties(data))
    }catch(error){
      dispatch(propertyAction.getErrors(error.message));
    }
}