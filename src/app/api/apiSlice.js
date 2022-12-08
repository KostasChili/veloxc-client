import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    //fetchBaseQuery similar to axios
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000'}),
    tagTypes:['Shop','User'],
    endpoints:builder =>({})
});