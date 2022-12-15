import { useGetShopQuery } from "./shopsApiSlice"
import { useParams } from "react-router-dom"
const ShopPage = () => {
  const {id} = useParams();
  const {
    data:shop,
  } = useGetShopQuery(id);
  console.log(shop);

  return(
    <div>
    <h1>Όλα τα ραντεβού για την επιχείρηση {shop?.title}</h1>
    </div>
  )

}


export default ShopPage
