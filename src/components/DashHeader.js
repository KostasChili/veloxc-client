import { Link,useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";


const DashHeader = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();


  const [sendLogout,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation();

  const onLogoutClicked = () =>sendLogout();

  useEffect(()=>{ 
    if(isSuccess){
      navigate('/');
    }
  },[isSuccess,navigate]);

  if(isLoading) return <p>Loading...</p>

  if(isError){
    console.log(error.data?.message);
  }

 const logoutButton = (
  <button
    title="Logout"
    onClick={onLogoutClicked}
  >
  Αποσύνδεση
  </button>
 )

  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 className="dash-header__title">Velox Constitutio</h1>
        </Link>
        <nav className="dash-header__nav">
        {/*add nav buttons */}
        {logoutButton}
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
