import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder =>({
        login:builder.mutation({
            query:credentials =>({
                url:'/auth/login',
                method:'POST',
                body:{
                    ...credentials
                }
            })
        }),
        sendLogout:builder.mutation({
            query:()=>({
                url:'auth/logout',
                method:'POST'
            }),
            async onQueryStarted(arg,{dispatch,queryFulfilled}){
                //onQueryStarted when queryFulfilled we await for the query
                //return a data object
                try{
                    //const {data} = 
                    await queryFulfilled
                    //console.log(data); 
                     //sets the token to null 
                    dispatch(logOut());
                    //resets the api state (clears the cache)
                    dispatch(apiSlice.util.resetApiState());
                   
                }
                catch(err)
                {
                    console.log(err);
                }
            }
        }),
        refresh:builder.mutation({
            query:()=>({
                url:'/auth/refresh',
                method:'GET'
            })
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice