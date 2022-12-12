import { useGetShopsQuery } from "./shopsApiSlice";
import Shop from '../shops/Shop';
import { Link } from "react-router-dom";

const ShopsList = () => {
  const {
    data:shops,
    isLoading,
    isSuccess,
    isError,
    error
  }= useGetShopsQuery();

 let content 

 if(isLoading) content = <p>Loading....</p>

 if(isError) content = <p>{error?.data?.message}</p>

 if(isSuccess)
 {
  const {ids} = shops;


  const tableContent = ids?.length
  ?ids.map(shopId=><Shop key={shopId} shopId={shopId}/>)
  :null
  content = (
    <>
    <table >
    <thead >
      <tr>
        <th scope="col" >Ιδιοκτήτης</th>
        <th scope="col" >Επωνυμία</th>
        <th scope="col" >Περιγραφή</th>
      </tr>
    </thead> 
      <tbody>
      {tableContent}
      </tbody>
  </table>
  <div>
    <button><Link to='/dash/shops/new'>Καταχώρηση επιχείρησης</Link></button>
  </div>
  </>
  )

  return content;
 }

  return (
    <h1>
      'Ολες οι επιχειρήσεις'
    </h1>
  )
}

export default ShopsList
