import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import { useGetShopQuery } from "../shops/shopsApiSlice";
import {
  useMakeAppointmentMutation,
  useRetrieveAppointmentsPublicQuery,
} from "../appointments/appointmentsApiSlice";
import { useEffect, useState } from "react";
import { Button, MenuItem, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {getDate,getMonth,getYear,format,addDays} from "date-fns";


export default function CreateAppointment() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [canSelectDate, setCanSelectDate] = useState(false);
  const [dateFormated, setDateFormated] = useState(addDays((new Date()),1));
  const [date,setDate]= useState("");
  const [service, setService] = useState("");
  const [canSelectTime, setCanSelectTime] = useState(false);
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
    data: apps,
    isLoading: isAppsLoading,
    isSuccess: isAppsSuccess,
    isError: isAppError,
    error: appError,
  } = useRetrieveAppointmentsPublicQuery(id);

  let availableSlots = null;
  if (isAppsSuccess) {
    let occTimeSlots = apps.appList.map((ap) => {
      return `${ap.startTime}-${ap.endTime}`;
    });
    availableSlots = apps.allTimeSlots.filter(
      (item) => !occTimeSlots.includes(item)
    );
  }

 


  useEffect(() => {
    if ((name, lastName, email, service) !== "") {
      setCanSelectDate(true);
    }
  }, [name, lastName, email, service]);

  useEffect(() => {
    if (date) {
      setCanSelectTime(true);
    }
  }, [date]);


  {/* FUNCTIONS FOR THE DATE PICKER - TODO The date Picker could be moved to a component of its own with all function needed */}

  const handleDateSubmit = (e)=>{
    setDateFormated(e);
    setDate(`${getDate(dateFormated)}-${getMonth(dateFormated)+1}-${getYear(dateFormated)}`);
  }

  function disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }



  const canSave =
    [name, lastName, date, service, startTime, email].every(Boolean) &&
    !isLoading;

    {/* FORM SUBMITION */}

  const handleAppSubmit = () => {
    if (canSave) {
      setAppointment({
        id,
        date,
        service,
        customerName: name + " " + lastName,
        startTime: startTime.split("-")[0],
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
    navigate(`/shops/public/${id}/appsuccess`);
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
          id="comments"
          label="Σχόλια Για το Ραντεβού σας"
          multiline
          maxRows={5}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

      {/* DATE  PICKER CONDITIONAL RENDERING */}
        {canSelectDate ? (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Ημερομηνία"
                inputFormat="dd/MM/yyyy"
                value={dateFormated}
                onChange={handleDateSubmit}
                shouldDisableDate={disableWeekends}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </>
        ) : null}

 {/* TIME  PICKER CONDITIONAL RENDERING */}
        {canSelectTime ? (
          <>
            <TextField
              select
              id="startTime"
              label="Ωρα"
              value={startTime}
              selected
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            >
              {availableSlots !== null ? (
                availableSlots.map((slot) => {
                  return <MenuItem value={slot}>{slot}</MenuItem>;
                })
              ) : (
                <MenuItem>Δεν υπάρχουν διαθέσημα ραντεβού</MenuItem>
              )}
            </TextField>
          </>
        ) : null}
      </div>

      <Button disabled={!canSave} onClick={handleAppSubmit} variant="contained">
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
