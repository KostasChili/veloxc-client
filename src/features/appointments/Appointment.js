import { useSelector } from "react-redux";
import { selectAppointmentsById } from "./appointmentsApiSlice";



const Appointment = ({appId})=>{
    const appointment = useSelector(state=>selectAppointmentsById(state,appId));
    return (
        <tr>
            <td key={0}>{(appointment?._id).substring(16,24)}</td>
            <td key={1}>{appointment?.customerName}</td>
            <td key={2}>{appointment?.service}</td>
            <td key={3}>{appointment?.date}</td>
            <td key={4}>{appointment?.active?"ενεργο":"ανενεργο"}</td>
            <td key={5}><button>Διαγραφή</button></td>
            <td key={6}>{appointment?.active?<button>Ακύρωση</button>:null}</td>
        </tr>
    )
 
    
}

export default Appointment;