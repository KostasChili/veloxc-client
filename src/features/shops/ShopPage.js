import {useRetrieveAppointmentsQuery} from '../appointments/appointmentsApiSlice'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ShopPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useRetrieveAppointmentsQuery(id,{
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });


  let content
  if(isLoading) content = <p>Loading...</p>
  if(isSuccess) 
{
  const tableContent = data.appointments.map(d=>( 
  <tr key={d._id}>
    <td>{d.customerName}</td>
    <td>{d.service}</td>
    <td>{d.date}</td>
    <td>{d.time}</td>
    <td>{new Date(d.createdAt).toLocaleString('el-GB',{day:'numeric',month:'long'})}</td>
    <td>{d.active?"ενεργό":"ακυρωμένο"}</td>
  </tr>
  ))


    content = (
      <>
      <h2>Όλα τα ρανεβού για :</h2>
      <p>{data?.title}</p>
      <table>
        <thead>
          <tr>
            <th>Όνομα Πελάτη</th>
            <th>Υπηρεσία</th>
            <th>Ημερομηνία</th>
            <th>Ώρα</th>
            <th>Δημιουργήθηκε</th>
            <th>Κατάσταστη</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
      <button onClick={()=>navigate(`/dash/shops/${id}/createAppointment`)}>Καταχώρηση ραντεβού</button>
      </>
      )
      
  
 
}



  return content

}


export default ShopPage
