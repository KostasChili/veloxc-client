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
        query:appointmentData =>({
            url:`shops/public/appointments`,
            method:'POST',
            body:{
                ...appointmentData
            }
        })
    }),

  }),
});


export const {
  useRetrieveAppointmentsQuery,
    useMakeAppointmentMutation
} = appointmentsApiSlice
