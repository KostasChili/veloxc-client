import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsApiSlice";
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography} from '@mui/material';

const NewShopForm = () => {
  const [addNewShop, { isLoading, isSuccess }] = useAddNewShopMutation();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [opensAt,setOpensAt] = useState("");
  const [closesAt,setClosesAt] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setTel("");
      setEmail("");
      setCity("");
      setAddress("");
      setOpensAt("");
      setClosesAt("");
      navigate("/dash/shops");
    }
  }, [isSuccess, navigate]);



  const canSave = [title, description,tel,email,city,address,opensAt,closesAt].every(Boolean) && !isLoading;

  const onSaveShopClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const res = await addNewShop({ title, description, tel, email, city, address,opensAt,closesAt });
      console.log(res)
    }
  };

  const content = (
    <>
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
          <Typography  variant="h5" marginBottom={4}>
            Δημιουργία Επιχείρησης
          </Typography>
          <Typography variant='caption'>
            *Παρακαλούμε να συμπληρώσετε προσεκτικά όλα τα παρακάτω πεδία καθώς είναι όλα υποχρεωτικά.<br/>
            **Σε περίπτωση λάθους ή αλλαγής στοιχείων μπορείτε να τροποιήσετε και μετά την καταχώρηση της επιχείρησης
          </Typography>
          <Box variant="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Όνομασία Επιχείρησης"
                  name="title"
                  autoFocus
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Περιγραφή Επιχείρησης"
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="opensAt"
                  label="Ανοίγει"
                  name="opensAt"
                  onChange={(e)=>setOpensAt(e.target.value)}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  required
                  fullWidth
                  id="closesAt"
                  label="Κλείνει"
                  name="closesAt"
                  onChange={(e)=>setClosesAt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="tel"
                  label="Τηλέφωνο"
                  type="tel"
                  id="tel"
                  onChange={(e)=>setTel(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="Πόλη"
                  type="city"
                  id="city"
                  onChange={(e)=>setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Διεύθυνση"
                  type="address"
                  id="address"
                  onChange={(e)=>setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
             onClick={onSaveShopClicked}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Καταχώρηση Επιχείρησης
            </Button>
          </Box>
        </Box>
      </Container>
      {/* <form onSubmit={onSaveShopClicked}>
        <h2>Δημιουργία επιχείρησης</h2>

        <label htmlFor="title">Τίτλος Επιχείρησης:</label>
        <input
          id="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <br />
        <label htmlFor="description">Περιγραφή:</label>
        <textarea
          id="description"
          type="text"
          autoComplete="off"
          value={description}
          onChange={onDescriptionChanged}
        ></textarea>
        <br />
        <label htmlFor="opensAt">Ανοιγμα:</label>
        <input
          id="opensAt"
          type="opensAt"
          autoComplete="off"
          value={opensAt}
          onChange={(e) => {
            setOpensAt(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="closesAt">Κλείσιμο:</label>
        <input
          id="closesAt"
          type="closesAt"
          autoComplete="off"
          value={closesAt}
          onChange={(e) => {
            setClosesAt(e.target.value);
          }}
        ></input>
        <br />

        <label htmlFor="email">Email Επιχείρησης:</label>
        <input
          id="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br />

        <label htmlFor="tel">Τηλέφωνο Επικοινωνίας:</label>
        <input
          id="tel"
          type="text"
          autoComplete="off"
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="city">Πόλη:</label>
        <input
          id="city"
          type="text"
          autoComplete="off"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="address">Διεύθυνση:</label>
        <input
          id="address"
          type="text"
          autoComplete="off"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <br />
        <div>
          <button title="Save" disabled={!canSave}>
            Αποθήκευση
          </button>
        </div>
      </form> */}
    </>
  );

  return content;
};

export default NewShopForm;
