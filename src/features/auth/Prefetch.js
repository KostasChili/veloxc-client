import {store} from '../../app/store';
import { shopsApiSlice } from '../shops/shopsApiSlice';
import { appointmentsApiSlice } from '../appointments/appointmentsApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
useEffect(()=>{
    console.log('subscribing');
    //manual subscription to noes and users gives us access to the state 
    const shops = store.dispatch(shopsApiSlice.endpoints.getShops.initiate());
    const appointments = store.dispatch(appointmentsApiSlice.endpoints.getAppointments.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());


    return()=>{
        //we unsubscribe when we leave the protected pages
        //the outlet will be warped arround the protectede page
        console.log('unsubscribing');
        shops.unsubscribe();
        appointments.unsubscribe();
        users.unsubscribe();
    }

},[])

 return <Outlet/>
}

export default Prefetch
