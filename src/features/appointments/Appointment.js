import { useNavigate } from "react-router-dom";



const Appointment = ({app})=>{
    const navigate = useNavigate();

    return (
        <tr>
            <td key={0}>{(app?._id).substring(20,24)}</td>
            <td key={1}>{app?.customerName}</td>
            <td key={2}>{app?.service}</td>
            <td key={3}>{app?.date}</td>
            <td key={4}>{app?.active?"ενεργο":"ανενεργο"}</td>
            <button>Διαγραφή</button>
            {app?.active?<button>Ακύρωση</button>:null}
        </tr>
    )
 
    
}

export default Appointment;