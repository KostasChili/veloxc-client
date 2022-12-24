import { useSelector } from "react-redux";
import { selectAppointmentsById } from "./appointmentsApiSlice";

const Appointment = ({appId})=>{
  const app = useSelector(state=>(selectAppointmentsById(state,["63a5d2f11aa61b90f9137ecc",appId])));
  console.log(app);
   
    
    return (<>
    </>)
}

export default Appointment;