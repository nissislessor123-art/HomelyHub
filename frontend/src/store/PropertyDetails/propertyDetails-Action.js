import { propertyDetailsAction } from "./propertyDetails-Slice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsAction.getRequest());

        const response = await axiosInstance.get(
            `/v1/rent/listing/${id}`
        );

        console.log("API Response:", response);

        const { data } = response.data;

        dispatch(
            propertyDetailsAction.getPropertyDetails(data)
        );

    } catch (error) {
        console.log("API Error:", error);

        dispatch(
            propertyDetailsAction.getErrors(
                error.response?.data?.error || error.message
            )
        );
    }
};