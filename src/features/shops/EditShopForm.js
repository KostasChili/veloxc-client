import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateShopMutation, useDeleteShopMutation } from "./shopsApiSlice";
import {Box, Container, CssBaseline, Grid, TextField, Typography,Button} from '@mui/material';



const EditShopForm = (shop) => {
  const [updateShop, { isLoading, isSuccess }] = useUpdateShopMutation();

  const [deleteShop, { isSuccess: isDelSuccess }] = useDeleteShopMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(shop.shop.title);
  const [description, setDescription] = useState(shop.shop.description);
  const [username, setUsername] = useState(shop.shop.user);
  const [tel, setTel] = useState(shop.shop.tel);
  const [email, setEmail] = useState(shop.shop.email);
  const [city, setCity] = useState(shop.shop.city);
  const [address, setAddress] = useState(shop.shop.address);
  const [shopId, setShopId] = useState(shop.shop.id);
  const [shopPublicLink, setShopPublicLink] = useState(shop.shop.publicLink);
  const [opensAt,setOpensAt] = useState(shop.shop.opensAt);
  const [closesAt,setClosesAt] = useState(shop.shop.closesAt);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setDescription("");
      setUsername("");
      setTel("");
      setEmail("");
      setCity("");
      setAddress("");
      setShopId("");
      setShopPublicLink("");
      setOpensAt("");
      setClosesAt("");
      navigate("/dash/shops");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title, description,tel,email,city,address,closesAt,opensAt].every(Boolean) && !isLoading;

  const onSaveShopClicked = async (e) => {
    if (canSave) {
      await updateShop({
        id: shopId,
        title,
        description,
        opensAt,
        closesAt,
        tel,
        email,
        city,
        address,
      });
    }
  };
  const onDeleteShopClicked = async (e) => {
    await deleteShop({ id: shopId });
  };
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
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
          <Typography component="h1" variant="h5">
            Επεξεργασία Επιχείρησης
          </Typography>
          <Box component="form" noValidate onSubmit={(e)=>e.preventDefault} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Όνομασία Επιχείρησης"
                  InputLabelProps={{shrink:true}}
                  name="title"
                  autoFocus
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                InputLabelProps={{shrink:true}}
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Περιγραφή Επιχείρησης"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  id="opensAt"
                  label="Ανοίγει"
                  name="opensAt"
                  value={opensAt}
                  onChange={(e)=>setOpensAt(e.target.value)}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  id="closesAt"
                  label="Κλείνει"
                  name="closesAt"
                  value={closesAt}
                  onChange={(e)=>setClosesAt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  name="tel"
                  label="Τηλέφωνο"
                  type="tel"
                  id="tel"
                  value={tel}
                  onChange={(e)=>setTel(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  name="city"
                  label="Πόλη"
                  type="city"
                  id="city"
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  required
                  fullWidth
                  name="address"
                  label="Διεύθυνση"
                  type="address"
                  id="address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  inputProps={{readOnly:true}}
                  fullWidth
                  name="user"
                  label="User id"
                  type="user"
                  id="user"
                  value={shop.shop.user}
                  onChange={(e)=>setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                InputLabelProps={{shrink:true}}
                  inputProps={{readOnly:true}}
                  fullWidth
                  name="publicLink"
                  label="Δημόσιος Σύνδεσμος Επιχείρησης"
                  type="publicLink"
                  id="publicLink"
                  value={shop.shop.publicLink}
                  onChange={(e)=>setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button onClick={onSaveShopClicked}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!canSave}
            >
              Τροποποίηση Επιχείρησης
            </Button>
            <Button color="warning" onClick={onDeleteShopClicked}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Διαγραφή Επιχείρησης
            </Button>
          </Box>
        </Box>
      </Container>
      {/* <form onSubmit={(e) => e.preventDefault()}>

        <div>
          <h2>Επεξεργασία καταστήματος {shop.title}</h2>
          <div className="form__action-buttons">
            <button
              title="Save"
              onClick={onSaveShopClicked}
              disabled={!canSave}
            >
              Αποθήκευση
            </button>
            <button title="Delete" onClick={onDeleteShopClicked}>
              Διαγραφή
            </button>
          </div>
        </div>
        <label htmlFor="shop-title">Ονομασία επιχείρησης:</label>
        <input
          id="shop-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />
        <br />

        <label htmlFor="shop-description">Περιγραφή:</label>
        <textarea
          id="shop-text"
          name="text"
          value={description}
          onChange={onDescriptionChanged}
        />
        <br />
        <div>
          <div>
            <label htmlFor="shop-username">
              Ιδιοκτήτης
              <input id="shop-username" type="text" readOnly value={username} />
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
            </label>

            <label htmlFor="shop-Id">ShopId:</label>
            <input
              id="shop-Id"
              className="form__select"
              value={shopId}
              readOnly
            ></input>
            <br />
            <label htmlFor="public-link">Σύνδεσμος:</label>
            <input
              id="public-link"
              className="form__select"
              value={shopPublicLink}
              readOnly
            ></input>
            <br />
          </div>
        </div> 
      </form> */}
    </>
  );

  return content;
};

export default EditShopForm;
