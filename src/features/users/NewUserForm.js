


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";



const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9]{4,12}$/;



export default function NewUserForm() {

    const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUn, setValidUn] = useState(false);
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [validMail, setValidMail] = useState(false);


    useEffect(() => {
    setValidUn(USER_REGEX.test(username));

   
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));

  }, [password]);

 

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      setFirstname("");
      setLastname("");
      navigate("/");
    }
  }, [isSuccess, navigate]);


    const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username,firstname,lastname, password, email });
    }
  };

     const canSave = [validPwd, validUn].every(Boolean) && !isLoading;


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Εγγραφή
          </Typography>
          <Box component="form" noValidate onSubmit={onSaveUserClicked} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Όνομα Χρήστη"
                  name="username"
                  autoFocus
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Όνομα"
                  onChange={(e)=>setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Επίθετο"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Κωδικός"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Εγγραφη
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Έχετε ήδη λογαριασμό; Συνδεθείτε
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAddNewUserMutation } from "./usersApiSlice";

// const USER_REGEX = /^[A-z]{3,20}$/;
// const PWD_REGEX = /^[A-z0-9]{4,12}$/;


// const NewUserForm = () => {
//   const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [validUn, setValidUn] = useState(false);
//   const [firstname,setFirstname] = useState("");
//   const [lastname,setLastname] = useState("");
//   const [password, setPassword] = useState("");
//   const [validPwd, setValidPwd] = useState(false);
//   const [email, setEmail] = useState("");
//   const [validMail, setValidMail] = useState(false);

//   useEffect(() => {
//     setValidUn(USER_REGEX.test(username));
   
//   }, [username]);

//   useEffect(() => {
//     setValidPwd(PWD_REGEX.test(password));
   
//   }, [password]);

 

//   useEffect(() => {
//     if (isSuccess) {
//       setUsername("");
//       setPassword("");
//       setEmail("");
//       setFirstname("");
//       setLastname("");
//       navigate("/");
//     }
//   }, [isSuccess, navigate]);

//   const onUsernameChanged = (e) => setUsername(e.target.value);
//   const onFirstnameChanged = e => setFirstname(e.target.value);
//   const onLastnameChanged = e => setLastname(e.target.value);
//   const onPasswordChanged = (e) => setPassword(e.target.value);
//   const onEmailChanged = (e) => setEmail(e.target.value);

  
//   const canSave = [validPwd, validUn].every(Boolean) && !isLoading;

//   const onSaveUserClicked = async (e) => {
//     e.preventDefault();
//     if (canSave) {
//       await addNewUser({ username,firstname,lastname, password, email });
//     }
//   };
 
 
 
//   const content = (
//     <>
//       <form onSubmit={onSaveUserClicked}>
//         <h2>Νεος Χρήστης</h2>
//         <div>
//           <button disabled={!canSave} title="Save">
//             Εγγραφή
//           </button>
//         </div>
//         <label htmlFor="username">Όνομα Χρήστη</label>
//         <input
//           id="username"
//           name="username"
//           value={username}
//           type="text"
//           autoComplete="off"
//           onChange={onUsernameChanged}
//         ></input>

// <label htmlFor="firstname">Όνομα</label>
//         <input
//           id="firstname"
//           name="firstname"
//           value={firstname}
//           type="text"
//           autoComplete="off"
//           onChange={onFirstnameChanged}
//         ></input>

// <label htmlFor="lastname">Επίθετο</label>
//         <input
//           id="lastname"
//           name="lastname"
//           value={lastname}
//           type="text"
//           autoComplete="off"
//           onChange={onLastnameChanged}
//         ></input>

//         <label htmlFor="password">Κωδικός Πρόσβασης</label>
//         <input
//           id="password"
//           name="password"
//           value={password}
//           type="password"
//           onChange={onPasswordChanged}
//         ></input>

//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           name="email"
//           value={email}
//           type="email"
//           onChange={onEmailChanged}
//         ></input>
//       </form>
//     </>
//   );
//   return content;
// };

// export default NewUserForm;
