import {createSelector,createEntityAdapter} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

//init the entity adapter
const appointmentsAdapter = createEntityAdapter({
    //can set functions here like sortComparer
});

//set initial state

const initialState =appointmentsAdapter.getInitialState();

//create the endpoints

export const appointmentsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getAppointments:builder.query({
            query:()=>'/shops/appointments',
            validateStatus:(req,res)=>{
                return res.status === 200 && !res.isError
            },
            keepUnusedDataFor:60,
            transformResponse:resData=>{                          //responseData is the response from the query
                const loadedNotes = resData.map(appointment =>{          //we map over the Data and we set the note.id to note._id (mongo id)
                    appointment.id = appointment._id
                    return appointment
                    
                });
                return appointmentsAdapter.setAll(initialState,loadedNotes) 
            },
            providesTags:(res,error,arg)=>{
                if(res?.ids)
                {
                    return[
                        {
                            type:'Appointment',id:'LIST'
                        },
                        ...res.ids.map(id=>({type:'Appointment',id}))
                    ]
                }
                else return [{type:'Appointment',id:'LIST'}]
            }
        })
    })
});

//RTK query hooks

export const{
    useGetAppointmentsQuery
}=appointmentsApiSlice

//returns the query result object
//we use the notesApislice refering to the endpoints and calling getusers endpoint chaining select() 
//this gets the query result
export const selectedAppointmentsResult = appointmentsApiSlice.endpoints.getAppointments.select();

//creates memoized selector
//we use createSelector, we pass the selectNotesResult
//a functions comes in and grabs the data from the selectNotesResult
//its not exported
const selectedAppointmentsData = createSelector(
    selectedAppointmentsResult,
    appointmentsResult=>appointmentsResult.data// normalized state object with ids & entities
)


//getSelectors creates these selectors and we rename them with aliases to use on the notes
//using destructuring
export const {
    selectAll:selectAllAppointments,
    selectById:selectAppointmentsById,
    selectIds:selectAppointmentsIds,
    //pass in the selector that returns the notes slice of state
} = appointmentsAdapter.getSelectors(state=>selectedAppointmentsData(state)??initialState)
//we use getSelectors,we pass the state , the selectUsersData (??nul colesky operator) and if null then goes to initial state
