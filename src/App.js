import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import ShopsList from "./features/shops/ShopsList";
import ShopPage from "./features/shops/ShopPage";
import Prefetch from "./features/auth/Prefetch";
import EditShop from "./features/shops/EditShop";
import NewShopForm from "./features/shops/NewShopForm";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import ShopPublicPage from "./features/public/ShopPublicPage";
import CreateAppointment from "./features/shops/CreateAppointment";
import PersistLogin from "./features/auth/PersistLogin";
import AppSuccess from "./features/public/AppSuccess";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";

import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <NavBar/>
        <Routes>
          <Route index element={<Public />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<NewUserForm />} />
          <Route path="/shops/public/:id">
            <Route index element={<ShopPublicPage />} />
            <Route path="appsuccess" element={<AppSuccess />} />
          </Route>
          {/*public route to set an appointment */}

          <Route element={<PersistLogin />}>
            <Route path="/" element={<Layout />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                  <Route path="shops">
                    <Route index element={<ShopsList />} />{" "}
                    {/* an admin will be able to see all shop but a shopkeeper will be able to see only his shops*/}
                    <Route path="new" element={<NewShopForm />} />
                    <Route path=":id" element={<EditShop />}></Route>
                    <Route path=":id/appointments" element={<ShopPage />} />
                    <Route
                      path=":id/createAppointment"
                      element={<CreateAppointment />}
                    />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
