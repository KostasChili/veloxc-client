import { useParams,useNavigate } from "react-router-dom";
import { useGetShopQuery } from "../shops/shopsApiSlice";
import { useMakeAppointmentMutation } from "../appointments/appointmentsApiSlice";
import { useState } from "react";

const CreateAppointment = () => {
    const navigate = useNavigate();
  const [name,setName] = useState('');
  const [lastName,setLastName]= useState('');
  const [customerName,setCustomerName] = useState('');
  const [date,setDate] = useState('');
  const [service,setService] = useState('');
  const {id} = useParams();

  const {
    data:shop,
    isLoading,
    isSuccess,
    isError,
    error
  }= useGetShopQuery(id);

  const [setAppointment,{
    isLoading:isAppLoading,
    isSuccess:isAppSuccess
  }] = useMakeAppointmentMutation();


  const canSave = [name,lastName,date,service].every(Boolean) && !isLoading;

  const handleAppSubmit = ()=>{
    if(canSave)
    {
      setAppointment({id,date,service,customerName:name+" "+lastName});
    }
    setName('');
    setLastName('');
    setDate('');
    setService('');
    navigate(`/dash/shops/${id}/appointments`)
  }


  let content

  if(isLoading) content = <p>Loading...</p>

  if(isSuccess) {
    content = (
   <>
      <section>
       <h2>{shop.title}</h2>
        <p>{shop.description}</p>
     </section>
     <section>
      <h2>Δημιουργία Ραντεβού</h2>
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
        <br/>
        <button onClick={handleAppSubmit}>Επικύρωση Ραντεβού</button>
      </form>
     </section>
   </>

    )
  }
  return content
 
}

export default CreateAppointment
