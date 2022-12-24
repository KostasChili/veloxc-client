import { useRetrieveAppointmentsQuery } from "./appointmentsApiSlice";
import Appointment from "./Appointment";
import { useNavigate ,useParams} from "react-router-dom";
import { TableCell, TableHead, TableRow } from "@mui/material";



const AppointmentsList =  ()=>
{
    const navigate = useNavigate();
    const {id}= useParams();

    const {
        data:appointments,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useRetrieveAppointmentsQuery(id,{
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,

    })
  let tableContent;
  let content;
  if(!appointments) content =<p>Loading....</p>;
  if(!isLoading) content = <p>Loading....</p>;
  if (isError) content = <p>{error?.data?.message}</p>;

 if(isSuccess)
 {

    const {ids} = appointments;
     tableContent = ids?.length
    ? ids.map((appId)=><Appointment key={appId} appId={appId} />)
    :null
    }
    else tableContent =null;

    content = (
        <>
          <h2>Όλα τα ρανεβού για :</h2>
         
          <table>
            <TableHead>
              <TableRow>
                <TableCell>Όνομα Πελάτη</TableCell>
                <TableCell>Υπηρεσία</TableCell>
                <TableCell>Ημερομηνία</TableCell>
                <TableCell>Ώρα Εναρξης</TableCell>
                <TableCell>Ώρα Λήξης</TableCell>
                <TableCell>Δημιουργήθηκε</TableCell>
                <TableCell>Κατάσταστη</TableCell>
              </TableRow>
            </TableHead>
            <tbody>{tableContent}</tbody>
          </table>
          <button onClick={() => navigate(`/dash/shops/${id}/createAppointment`)}>
            Καταχώρηση ραντεβού
          </button>
        </>
      );
    return content

}


export default AppointmentsList;