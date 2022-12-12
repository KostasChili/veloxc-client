import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShopsById } from "./shopsApiSlice";
import EditShopForm from './EditShopForm';

const EditShop = () => {
    const {id} = useParams();
    const shop = useSelector(state=>selectShopsById(state,id));

    const content = shop? <EditShopForm shop={shop}/>:<p>Loading...</p>

  return content
}

export default EditShop
