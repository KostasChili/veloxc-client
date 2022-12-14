import { useParams } from "react-router-dom";
import { useRetrieveOneAppointmentQuery } from "./appointmentsApiSlice";



const handleCancelApp = (id)=>{
 console.log('cancelled app',id)
}


const Appointment = ()=>{
  const {appId} = useParams();
const {
  data:appointment,
  isSuccess,
  isLoading,
  isError,
  error
} = useRetrieveOneAppointmentQuery(appId);

  let content
  if(isLoading) content = <p>Loading...</p>
  if(isSuccess) content = (
    <>
      <div>
        <label htmlFor="name">Ονοματεπόνυμο Πελάτη</label>
        <p id="name">{appointment.customerName}</p>
      </div>
      <hr/>
      <div>
        <label htmlFor="date">Ημερομηνία και Ώρα</label>
        <p id="date">{appointment.date} στης {appointment.startTime} με {appointment.endTime}</p>
      </div>
      <hr/>
      <div>
      <label htmlFor="email">email</label>
        <p id="email">{appointment.email}</p>
      </div>
      <hr/>
      <div>
      <label htmlFor="service">Υπηρεσία</label>
        <p id="service">{appointment.service}</p>
      </div>
      <hr/>
      <div>
      <label htmlFor="comments">Σχόλια Πελάτη</label>
        <p id="comments">{appointment.comments}</p>
      </div>
      <hr/>
      <button onClick={(e)=>handleCancelApp({id:appointment._id})}>Ακύρωση Ραντεβού</button>
    </>
  )
   
    
    return content
}

export default Appointment;