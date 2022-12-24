
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useGetShopQuery } from "../shops/shopsApiSlice";
import { useMakeAppointmentMutation ,useRetrieveAppointmentsPublicQuery} from "../appointments/appointmentsApiSlice";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function CreateAppointment() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");
  const [startTime, setStartTime] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const { id } = useParams();

  const {
    data: shop,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopQuery(id);

  const [setAppointment, { isLoading: isAppLoading, isSuccess: isAppSuccess }] =
    useMakeAppointmentMutation();

      const {
    data:apps,
    isLoading:isAppsLoading,
    isSuccess:isAppsSuccess,
    isError:isAppError,
    error:appError

  }= useRetrieveAppointmentsPublicQuery(id);

  // console.log(apps)

  const canSave =
    [name, lastName, date, service, startTime, email].every(Boolean) &&
    !isLoading;

  const handleAppSubmit = () => {
    if (canSave) {
      setAppointment({
        id,
        date,
        service,
        customerName: name + " " + lastName,
        startTime,
        email,
        comments,
      });
    }
    setName("");
    setLastName("");
    setDate("");
    setService("");
    setStartTime("");
    setEmail("");
    setComments("");
    navigate(`/dash/shops/${id}/appointments`);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography variant="h6">
          Καλώς ήρθατε στην σελίδα του καταστήματος {shop?.title}
        </Typography>
        <Typography>
          Παρακαλώ συμπληρώστε τα παρακάτω στοιχεία για να κλείσετε το ραντεβού
          σας
        </Typography>
      </div>
      <div>
        <TextField
          id="name"
          label="Ονομα"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="lastName"
          label="Επίθετο"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          id="email"
          label="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="service"
          label="Υπηρεσία"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <TextField
          id="startTime"
          label="Ωρα"
          value={startTime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />

        <TextField
          id="comments"
          label="Σχόλια Για το Ραντεβού σας"
          multiline
          maxRows={5}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <label htmlFor="date">Ημερομηνία : </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
      </div>

      <Button onClick={handleAppSubmit} variant="contained">
        Καταχωρηση Ραντεβου
      </Button>
    </Box>
  );
}


// import { useParams ,useNavigate} from "react-router-dom";
// import { useGetShopQuery } from "../shops/shopsApiSlice";
// import { useMakeAppointmentMutation,useRetrieveAppointmentsPublicQuery } from "../appointments/appointmentsApiSlice";
// import { useState } from "react";

// const ShopPublicPage = () => {
//   const navigate = useNavigate();

//   const [name,setName] = useState('');
//   const [lastName,setLastName]= useState('');
//   const [date,setDate] = useState('');
//   const [service,setService] = useState('');
//   const [email,setEmail] = useState('');
//   const [startTime,setStartTime] = useState('');
//   const {id} = useParams();

//   const {
//     data:shop,
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   }= useGetShopQuery(id);

//   const {
//     data:apps,
//     isLoading:isAppsLoading,
//     isSuccess:isAppSuccess,
//     isError:isAppError,
//     error:appError

//   }= useRetrieveAppointmentsPublicQuery(id);

//   const [setAppointment,{
//     isLoading:isMakeAppLoading,
//     isSuccess:isMakeAppSuccess,
//     isError:isMakeAppError,
//     error:makeAppError
//   }] = useMakeAppointmentMutation(id);


//   const canSave = [name,lastName,date,service,startTime,email].every(Boolean) && !isLoading;

//   const handleAppSubmit = ()=>{
//     if(canSave)
//     {
//       setAppointment({id,date,service,customerName:name+" "+lastName,startTime,email});
//     }
//     setName('');
//     setLastName('');
//     setDate('');
//     setService('');
//     setStartTime('');
//     setEmail('');
//     navigate(`/shops/public/${id}/appsuccess`)
//   }


//   let content

//   if(isLoading) content = <p>Loading...</p>

//   if(isSuccess) {
//     content = (
//    <>
//       <section>
//        <h2>Καλώς ήρθατε στη σελίδα του {shop.title}</h2>
//         <p>{shop.description}</p>
//      </section>
//      <section>
//       <h2>Κλείστε Ραντεβού Τώρα</h2>
//       <form onSubmit={(e)=>e.preventDefault()}>
//         <label htmlFor="name">Όνομα : </label>
//         <input 
//           onChange={(e)=>{setName(e.target.value)}}
//           id="name"
//           type="text"
//           value={name}
//         ></input>
//           <br/>
//          <label htmlFor="lastName">Επίθετο : </label>
//         <input
//           onChange={(e)=>{setLastName(e.target.value)}}
//           id="lastName"
//           type="text"
//           value={lastName}
//         ></input>
//             <br/>
//             <label htmlFor="email">Email : </label>
//         <input
//           onChange={(e)=>{setEmail(e.target.value)}}
//           id="email"
//           type="email"
//           value={email}
//         ></input>
//             <br/>
//          <label htmlFor="service">Παροχή υπηρεσίας : </label>
//         <input
//          onChange={(e)=>{setService(e.target.value)}}
//           id="service"
//           type="text"
//           value={service}
//         ></input>
//         <br/>
//          <label htmlFor="date">Ημερομηνία : </label>
//         <input
//          onChange={(e)=>{setDate(e.target.value)}}
//           id="date"
//           type="date"
//           value={date}
//         ></input>
//             <label htmlFor="startTime">Ώρα : </label>
//         <input
//          onChange={(e)=>{setStartTime(e.target.value)}}
//           id="startTime"
//           type="startTime"
//           value={startTime}
//         ></input>
//         <br/>
//         <br/>
//         <button onClick={handleAppSubmit}>Επικύρωση Ραντεβού</button>
//       </form>
//      </section>
//    </>

//     )
//   }
//   return content
 
// }

// export default ShopPublicPage
