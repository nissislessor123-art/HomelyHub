//state manager 
//one pice of redux store
//we should get all list of propertys
//count the properties
//search filters
//loding flag
//error

import { createSlice } from "@reduxjs/toolkit";
const propertySlice = createSlice({
    name:"property",
    initialState:{//user first opeining of web
        properties:[],//array of prpperties object from backend
        totalProperties: 0,
        SearchParams:{},
        error:null,
        loading:false,


    },
    reducers:{//funs allow to change the state asynconous 
        getRequest(state){
            state.loading = true;
        },
        getProperties(state,action){
            state.properties = action.payload.data
            state.totalProperties = action.payload.all_properties;
            state.loading = false;//res finished hide the loader
        },
        updateSearchParams:(state,action)=>{
            state.SearchParams= Object.keys(action.payload).length===0 ?{}:{
                ...state.SearchParams,
                ...action.payload
            }

        },
        getErrors(state,action){
            state.error = action.payload
            
        }

    }
})

export const propertyAction= propertySlice.actions
export default propertySlice;