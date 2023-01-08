import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//using entity adapter we get normalize state
//enities cant be iterated but id can

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  //we use the api slice to inject the endpoints in the original api slice
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users", //the query that goes to the /users endpoint
      validateStatus: (response, result) => {
        //making sure there is not an error and we have a status 200
        return response.status === 200 && !result.isError;
      },

      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
       
        return usersAdapter.setAll(initialState, loadedUsers); //return the loadedUsers with the new Id property
      },
      providesTags: (result, error, arg) => {
        //check if there is an id on the result
        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      //we pass in some initial data
      query: (initialUserData) => ({
        //we go to the users endpoint with a POST method
        url: "/users",
        method: "POST",
        body: {
          //and pass this data to the body
          ...initialUserData,
        },
      }),
      invalidatesTags: [
        //we invalidate the data forcing the cache we use with RTK
        { type: "User", id: "LIST" }, //to update -> the user list will be invalidated so it will need to be updated
      ],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        //now we can specify the id of te user we update
        { type: "User", id: arg.id }, //it invalidates the users id and updates that
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

//RTK query will create a hook based on the endpoint which we can export
export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

//returns the query result object
//we use the usersApislice refering to the endpoints and calling getusers endpoint chaining select()
//this gets the query result
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

//creates memoized selector
//we use createSelector, we pass the selectUsersResult
//a functions comes in and grabs the data from the selectUsersResult
//its not exported
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases to use on the users
//using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  //pass in the selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
//we use getSelectors,we pass the state , the selectUsersData (??nul colesky operator) and if null then goes to initial state
