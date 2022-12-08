import {Routes,Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from "./features/auth/Login";
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import ShopsList from './features/shops/ShopsList';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/shops/:id/appointment'></Route> {/*public route to set an appointment */}

        <Route path='dash' element={<DashLayout/>}>
          <Route index element={<Welcome/>}/>
          <Route path='shops'>
            <Route index element={<ShopsList/>}/> {/* an admin will be able to see all shop but a shopkeeper will be able to see only his shops*/}
          </Route> 
        </Route>
      </Route>
    </Routes>
      
    </div>
  );
}

export default App;
