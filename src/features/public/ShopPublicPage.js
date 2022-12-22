import { useParams ,useNavigate} from "react-router-dom";
import { useGetShopQuery } from "../shops/shopsApiSlice";
import { useMakeAppointmentMutation,useRetrieveAppointmentsPublicQuery } from "../appointments/appointmentsApiSlice";
import { useState } from "react";

const ShopPublicPage = () => {
  const navigate = useNavigate();

  const [name,setName] = useState('');
  const [lastName,setLastName]= useState('');
  const [date,setDate] = useState('');
  const [service,setService] = useState('');
  const [email,setEmail] = useState('');
  const [time,setTime] = useState('');
  const {id} = useParams();

  const {
    data:shop,
    isLoading,
    isSuccess,
    isError,
    error
  }= useGetShopQuery(id);

  const {
    data:apps,
    isLoading:isAppsLoading,
    isSuccess:isAppSuccess,
    isError:isAppError,
    error:appError

  }= useRetrieveAppointmentsPublicQuery(id);

  const [setAppointment,{
    isLoading:isMakeAppLoading,
    isSuccess:isMakeAppSuccess,
    isError:isMakeAppError,
    error:makeAppError
  }] = useMakeAppointmentMutation(id);


  const canSave = [name,lastName,date,service,time,email].every(Boolean) && !isLoading;

  const handleAppSubmit = ()=>{
    if(canSave)
    {
      setAppointment({id,date,service,customerName:name+" "+lastName,time,email});
    }
    setName('');
    setLastName('');
    setDate('');
    setService('');
    setTime('');
    setEmail('');
    navigate(`/shops/public/${id}/appsuccess`)
  }


  let content

  if(isLoading) content = <p>Loading...</p>

  if(isSuccess) {
    content = (
   <>
      <section>
       <h2>Καλώς ήρθατε στη σελίδα του {shop.title}</h2>
        <p>{shop.description}</p>
     </section>
     <section>
      <h2>Κλείστε Ραντεβού Τώρα</h2>
      <form onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="name">Όνομα : </label>
        <input 
          onChange={(e)=>{setName(e.target.value)}}
          id="name"
          type="text"
          value={name}
        ></input>
          <br/>
         <label htmlFor="lastName">Επίθετο : </label>
        <input
          onChange={(e)=>{setLastName(e.target.value)}}
          id="lastName"
          type="text"
          value={lastName}
        ></input>
            <br/>
            <label htmlFor="email">Email : </label>
        <input
          onChange={(e)=>{setEmail(e.target.value)}}
          id="email"
          type="email"
          value={email}
        ></input>
            <br/>
         <label htmlFor="service">Παροχή υπηρεσίας : </label>
        <input
         onChange={(e)=>{setService(e.target.value)}}
          id="service"
          type="text"
          value={service}
        ></input>
        <br/>
         <label htmlFor="date">Ημερομηνία : </label>
        <input
         onChange={(e)=>{setDate(e.target.value)}}
          id="date"
          type="date"
          value={date}
        ></input>
            <label htmlFor="time">Ώρα : </label>
        <input
         onChange={(e)=>{setTime(e.target.value)}}
          id="time"
          type="time"
          value={time}
        ></input>
        <br/>
        <br/>
        <button onClick={handleAppSubmit}>Επικύρωση Ραντεβού</button>
      </form>
     </section>
   </>

    )
  }
  return content
 
}

export default ShopPublicPage
