// import { Link,useNavigate,useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { useSendLogoutMutation } from "../features/auth/authApiSlice";

// const DashHeader = () => {
//   const navigate = useNavigate();
//   const {pathname} = useLocation();

//   const [sendLogout,{
//     isLoading,
//     isSuccess,
//     isError,
//     error
//   }] = useSendLogoutMutation();

//   const onLogoutClicked = () =>sendLogout();

//   useEffect(()=>{
//     if(isSuccess){
//       navigate('/');
//     }
//   },[isSuccess,navigate]);

//   if(isLoading) return <p>Loading...</p>

//   if(isError){
//     console.log(error.data?.message);
//   }

//  const logoutButton = (
//   <button
//     title="Logout"
//     onClick={onLogoutClicked}
//   >
//   Αποσύνδεση
//   </button>
//  )

//   return (
//     <header className="dash-header">
//       <div className="dash-header__container">
//         <Link to="/dash">
//           <h1 className="dash-header__title">Velox Constitutio</h1>
//         </Link>
//         <nav className="dash-header__nav">
//         {/*add nav buttons */}
//         {logoutButton}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default DashHeader;

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import { Logout, Home, HomeTwoTone } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";


const drawerWidth = 240;

export default function NavBar(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userLoggedIn = useSelector(selectCurrentToken);
  // const navItems = userLoggedIn === null ? [{ name: 'Σύνδεση' ,link:'/login'}, { name: 'Εγγραφή',link:'/register' }] : [{ name: 'Αποσύνδεση' }]

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const onLogoutClicked = () => sendLogout();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    console.log(error.data?.message);
  }

  const drawer = (
    <Stack
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      height={"100%"}
      justifyContent={"space-between"}
    >
      <Stack spacing={1}>
        <Typography  variant="h6" sx={{ my: 2 }}>
          VeloxC
        </Typography>

        <Divider />
        <Button href="/" startIcon={<Home />}>
          Αρχικη
        </Button>
      </Stack>
      <Stack direction={"column"} spacing={2} padding={"10px"}>
        <>
          {userLoggedIn === null ? (
            <>
              <Button href="/login" variant="contained">
                Συνδεση
              </Button>
              <Button
                href="/register"
                variant="outlined"
                style={{ background: "white" }}
              >
                Εγγραφη
              </Button>
            </>
          ) : (
            <Button
              onClick={sendLogout}
              endIcon={<Logout />}
              variant="contained"
              color="error"
            >
              Αποσυνδεση
            </Button>
          )}
        </>
      </Stack>
    </Stack>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#F7F7F7" }}>
        <Toolbar>
          <IconButton
            color="primary.black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Stack  sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }} direction="row" spacing={2}>
          <Typography
            color={"primary"}
            variant="h6"
            component="div"
          >
            VeloxC
          </Typography>
          <IconButton href="/">
            <HomeTwoTone/>
          </IconButton>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {userLoggedIn === null ? (
              <>
                <Button href="/login" variant="contained">
                  Συνδεση
                </Button>
                <Button
                  href="/register"
                  variant="outlined"
                  style={{ background: "white" }}
                >
                  Εγγραφη
                </Button>
              </>
            ) : (
              <Button
                onClick={sendLogout}
                endIcon={<Logout />}
                variant="contained"
                color="error"
              >
                Αποσυνδεση
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
