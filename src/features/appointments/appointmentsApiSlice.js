import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const appointmentsAdapter = createEntityAdapter({});

const intialState = appointmentsAdapter.getInitialState();

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveAppointments:builder.query({
      query:(id)=>({
        url:`shops/${id}/appointments`,
      })
    }),
    makeAppointment: builder.mutation({
        query:(appointmentData,id) =>({
            url:`shops/public/appointments/${id}`,
            method:'POST',
            body:{
                ...appointmentData
            }
        })
    }),
    retrieveAppointmentsPublic:builder.query({
      query:(id)=>({
        url:`/shops/public/appointments/${id}`,
        method:'GET',     
       })
    })

  }),
});


export const {
  useRetrieveAppointmentsQuery,
  useRetrieveAppointmentsPublicQuery,
    useMakeAppointmentMutation
} = appointmentsApiSlice
