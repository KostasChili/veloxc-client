import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";


const UsersList = () => {
  const {
    data:users, //we get back data that we rename to users
    isLoading,  //we have several states we can check
    isSuccess,
  } = useGetUsersQuery();

  let content 

  if(isLoading) content = <p>Loading...</p>


  if(isSuccess) {
    const {ids} = users;//destructure ids from users data

    const tableContent = ids?.length //if there are ids
    ?ids.map(userId=><User key={userId} userId={userId} />) //map over them and provide a user component
    :null

    content = (
      <>
      <table  >
        <thead >
          <tr>
            <th scope="col">Όνομα Χρήστη</th>
            <th scope="col" >Όνομα</th>
            <th scope="col" >Επίθετο</th>
            <th scope="col">Email</th>
            <th scope="col">Id</th>
            <th scope="col">password</th>
          </tr>
        </thead> 
          <tbody>
          {tableContent}
          </tbody>
      </table>
      <div>
      </div>
      </>
    )
    return content
    
  }
}

export default UsersList
