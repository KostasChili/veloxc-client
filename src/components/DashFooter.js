
import { useNavigate,useLocation } from "react-router-dom";


const DashFooter = () => {
    const navigate=useNavigate();
    const {pathname} = useLocation();

    const onGoHomeClicked = ()=>{
        navigate('/');
    }

    let goHomeButton = null;
    if(pathname!=='/dash')
    {
        goHomeButton=(
            <button  title="Home" onClick={onGoHomeClicked}>
            Αρχική
            </button>
        )
    }

  const content = (
    <footer className="dash-footer"> 
    {goHomeButton}
        <p>Τρέχων Χρήστης: </p>
        <p>Κατάσταση: </p>
    </footer>
  )
  
  
    return content;
}

export default DashFooter
