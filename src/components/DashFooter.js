
import { useNavigate,useLocation } from "react-router-dom";


const DashFooter = () => {
    const navigate=useNavigate();
    const {pathname} = useLocation();

    const onGoHomeClicked = ()=>{
        navigate('/');
    }



  const content = (
    <footer className="dash-footer"> 
        <p>Τρέχων Χρήστης: </p>
        <p>Κατάσταση: </p>
    </footer>
  )
  
  
    return content;
}

export default DashFooter
