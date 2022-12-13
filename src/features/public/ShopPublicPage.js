import { useParams } from "react-router-dom";
import { useGetShopQuery } from "../shops/shopsApiSlice";
import { useSetAppointmentMutation } from "../shops/shopsApiSlice";
import { useState } from "react";

const ShopPublicPage = () => {
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
  }] = useSetAppointmentMutation();


  const canSave = [name,lastName,date,service].every(Boolean) && !isLoading;

  const handleAppSubmit = ()=>{
    if(canSave)
    {
      setAppointment({id,date,service,name,lastName});
    }
    setName('');
    setLastName('');
    setDate('');
    setService('');
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

export default ShopPublicPage
