import Appointment from './Appointment';
import { useGetAppointmentsQuery } from './appointmentsApiSlice';


const AppointmentsList = () => {
  const {
    data:appointments,
    isLoading,
    isSuccess,
    isError,
    error
  }= useGetAppointmentsQuery();

 let content 

 if(isLoading) content = <p>Loading....</p>

 if(isError) content = <p>{error?.data?.message}</p>

 if(isSuccess)
 {
  const {ids} = appointments;


  const tableContent = ids?.length
  ?ids.map(appId=><Appointment key={appId} appId={appId}/>)
  :null
  content = (
    <table >
    <thead >
      <tr>
        <th scope="col" >Id Ραντεβού</th>
        <th scope="col" >Όνομα Πελάτη</th>
        <th scope="col" >Υπηρεσία</th>
        <th scope="col" >Ημερομηνία</th>
        <th scope="col" >κατάσταση</th>
      </tr>
    </thead> 
      <tbody>
      {tableContent}
      </tbody>
  </table>
  )

  return content;
 }

}

export default AppointmentsList
