import {createSelector,createEntityAdapter} from '@reduxjs/toolkit';
import {apiSlice} from '../../app/api/apiSlice';

//init the entity adapter
const shopsAdapter = createEntityAdapter({
    //can set functions here like sortComparer
});

//set initial state

const initialState =shopsAdapter.getInitialState();

//create the endpoints

export const shopsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getShops:builder.query({
            query:()=>'/shops',
            validateStatus:(req,res)=>{
                return res.status === 200 && !res.isError
            },
            keepUnusedDataFor:60,
            transformResponse:resData=>{                          //responseData is the response from the query
                const loadedNotes = resData.map(shop =>{          //we map over the Data and we set the note.id to note._id (mongo id)
                    shop.id = shop._id
                    return shop
                    
                });
                return shopsAdapter.setAll(initialState,loadedNotes) 
            },
            providesTags:(res,error,arg)=>{
                if(res?.ids)
                {
                    return[
                        {
                            type:'Shop',id:'LIST'
                        },
                        ...res.ids.map(id=>({type:'Shop',id}))
                    ]
                }
                else return [{type:'Shop',id:'LIST'}]
            }
        })
    })
});

//RTK query hooks

export const{
    useGetShopsQuery
}=shopsApiSlice

//returns the query result object
//we use the notesApislice refering to the endpoints and calling getusers endpoint chaining select() 
//this gets the query result
export const selectedShopsResult = shopsApiSlice.endpoints.getShops.select();

//creates memoized selector
//we use createSelector, we pass the selectNotesResult
//a functions comes in and grabs the data from the selectNotesResult
//its not exported
const selectedShopsData = createSelector(
    selectedShopsResult,
    shopsResult=>shopsResult.data// normalized state object with ids & entities
)


//getSelectors creates these selectors and we rename them with aliases to use on the notes
//using destructuring
export const {
    selectAll:selectAllShops,
    selectById:selectShopsById,
    selectIds:selectShopsIds,
    //pass in the selector that returns the notes slice of state
} = shopsAdapter.getSelectors(state=>selectedShopsData(state)??initialState)
//we use getSelectors,we pass the state , the selectUsersData (??nul colesky operator) and if null then goes to initial state
