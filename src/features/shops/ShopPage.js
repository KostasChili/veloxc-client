import { selectShopsById } from "./shopsApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Appointment from "../appointments/Appointment";


const ShopPage = () => {

  
  let content
  const {id} = useParams();
  const shop = useSelector(state=>selectShopsById(state,id));
  if(shop)
  {
    const appointments = shop.appointments;
    const tableContent = appointments?.length
    ?appointments.map(app =><Appointment key={app.id} app={app}/>)
    :null
    content = (
      <>
      <h2>Ολα τα ραντεβού για την επιχείρηση {shop.title}</h2>
      <table >
    <thead >
      <tr>
        <th scope="col" >ID ραντεβού</th>
        <th scope="col" >Όνομα Πελάτη</th>
        <th scope="col" >Υπηρεσία</th>
        <th scope="col" >Ημερομηνία</th>
        <th scope="col" >Ενεργό</th>
      </tr>
    </thead> 
      <tbody>
      {tableContent}
      </tbody>
  </table>
  <button>Προσθήκη Ραντεβού</button>
  </>
    )

    return content;
  }
}


export default ShopPage
