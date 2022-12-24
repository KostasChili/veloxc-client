

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as MuiLink} from "@mui/material"

import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";




export default function Login() {
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  if (isLoading) return <p>Loading...</p>;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        console.log("No server Respones");
      } else if (err.status === 400) {
        console.log("Missing username or password");
      } else if (err.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log(err.data?.message);
      }
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

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
          <Avatar sx={{ m: 1, bgcolor: 'primary.light' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Σύνδεση
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              ref={userRef}
              required
              fullWidth
              id="username"
              label="Όνομα Χρήστη"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e)=>setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Κωδικός Πρόσβασης"
              type="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value={persist} checked={persist} color="primary" onChange={handleToggle}/>}
              label="Μείνετε συνδεδεμένος"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Συνδεση
            </Button>
            <Grid container>
              <Grid item>
                <MuiLink href="/register" variant="body2">
                  {"Δεν έχετε λογαριασμό; "}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
 
  );
}

// import { useRef, useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { setCredentials } from "./authSlice";
// import { useLoginMutation } from "./authApiSlice";

// import usePersist from "../../hooks/usePersist";

// const Login = () => {
//   const userRef = useRef();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [persist, setPersist] = usePersist();

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginMutation();

//   useEffect(() => {
//     userRef.current.focus();
//   }, []);

//   if (isLoading) return <p>Loading...</p>;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { accessToken } = await login({ username, password }).unwrap();
//       dispatch(setCredentials({ accessToken }));
//       setUsername("");
//       setPassword("");
//       navigate("/dash");
//     } catch (err) {
//       if (!err.status) {
//         console.log("No server Respones");
//       } else if (err.status === 400) {
//         console.log("Missing username or password");
//       } else if (err.status === 401) {
//         console.log("Unauthorized");
//       } else {
//         console.log(err.data?.message);
//       }
//     }
//   };

//   const handleToggle = () => setPersist((prev) => !prev);

//   const content = (
//     <section>
//       <header>
//         <h1>Σύνδεση Συνεργάτη</h1>
//       </header>
//       <main>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="username">Όνομα Χρήστη</label>
//           <input
//             id="username"
//             type="text"
//             ref={userRef}
//             value={username}
//             autoComplete="off"
//             required
//             onChange={(e) => setUsername(e.target.value)}
//           ></input>

//           <label htmlFor="password">Κωδικός Χρήστη</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           ></input>
//           <button>Σύνδεση</button>

//           <label htmlFor="persist">
//             <input
//               id="persist"
//               type="checkbox"
//               onChange={handleToggle}
//               check={persist}
//               checked={persist}
//             />
//             Κράτησε με Συνδεδεμένο
//           </label>
//         </form>
//       </main>
//       <footer>
//         <Link to="/">Αρχική Σελίδα</Link>
//       </footer>
//     </section>
//   );

//   return content;
// };

// export default Login;
