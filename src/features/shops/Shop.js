import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShopsById } from "./shopsApiSlice";
import { useState} from "react";


  

const Shop = ({shopId})=>{
    const shop = useSelector(state=>selectShopsById(state,shopId));
    const navigate= useNavigate();
    const [descriptionState,setDescriptionState]=useState(false);

    if(shop){
        const user = shop.username;
        const title = shop.title;
        const handleDescription=()=>{
            setDescriptionState(!descriptionState);
        }
        const description = descriptionState?shop?.description:shop?.description.substring(0,20);
        const handleEdit =()=>navigate(`/dash/shops/${shopId}`);
        const handleShopHomePage=()=>navigate(`/dash/shops/appointments`);
            return(
                <tr>
                    <td>{user}</td>
                    <td>{title}</td>
                    <td>{description}<button onClick={handleDescription}>+</button></td>
                    <td><button onClick={handleEdit}>Επεξεργασία</button></td>
                    <td><button onClick={handleShopHomePage}>Λεπτομέριες</button></td>
                </tr>
            )
    }
    else
    return null
}

export default Shop;