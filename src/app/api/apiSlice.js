import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:5000',
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token = getState().auth.token
        if(token)
        {
            headers.set('authorization',`Bearer ${token}`)
        }
        return headers
    }
})

//define single api slice object
export const apiSlice = createApi({
    //fetchBaseQuery similar to axios
    baseQuery,
    tagTypes:['Shop','User','Appointment'],
    endpoints:builder =>({})
});