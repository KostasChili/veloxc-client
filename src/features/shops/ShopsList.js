import { useGetShopsQuery } from "./shopsApiSlice";
import Shop from '../shops/Shop';

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
    <table >
    <thead >
      <tr>
        <th scope="col" >User</th>
        <th scope="col" >Title</th>
        <th scope="col" >Description</th>
      </tr>
    </thead> 
      <tbody>
      {tableContent}
      </tbody>
  </table>
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
