import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const appointmentsAdapter = createEntityAdapter({});

const initialState = appointmentsAdapter.getInitialState();

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  tagTypes:['Appointments'],
  endpoints: (builder) => ({
    retrieveAppointments:builder.query({
      query:(id)=>({
        url:`shops/${id}/appointments`,
        providesTags:(result,error,arg)=>[
          {type:'Appointments',id:'LIST'},
          ...result.ids.map(id=>({type:"Appointments",id}))
        ]
      }),
      invalidatesTags:['Appointments']
     
         
      
    }),
    retrieveOneAppointment:builder.query({
      query:(appId)=>({
        url:`appointment/${appId}`,
        method:'GET'
      })
    }),
    makeAppointment: builder.mutation({
        query:(appointmentData,id) =>({
            url:`shops/public/appointments/${id}`,
            method:'POST',
            body:{
                ...appointmentData
            }
        }),
        invalidatesTags:['Appointments']
    }),
    retrieveAppointmentsPublic:builder.query({
      query:({id,date})=>({
        url:`/shops/public/appointments/${id}/${date}`,
        method:'GET',     
       }),
       invalidatesTags:['Appointments']
    }),
    changeAppointmentAttendedStatus:builder.mutation({
      query:(appId)=>({
        url:`/shops/public/appointments/${appId}`,
        method:'GET',
      }),
      invalidatesTags:['Appointments']
    })

  }),
});


export const {
  useRetrieveAppointmentsQuery,
  useRetrieveOneAppointmentQuery,
  useRetrieveAppointmentsPublicQuery,
    useMakeAppointmentMutation,
    useChangeAppointmentAttendedStatusMutation,
} = appointmentsApiSlice


