
import { useSelector } from "react-redux";

import EditUserForm from './EditUserForm'
import { selectCurrentToken } from "../auth/authSlice";
import { useGetUsersQuery } from "./usersApiSlice";

const EditUser = () => {
  const userLoggedIn = useSelector(selectCurrentToken);
  const {
    data:user, //we get back data that we rename to user
    isLoading,  //we have several states we can check
    isSuccess,
  } = useGetUsersQuery({
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });
  //const {id} = useParams();
  // const user = useSelector(state=>selectUserById(state,id));

  let content
  let userProfile

  if(isLoading) content = <p>Loading...</p>

  if(isSuccess){
    const {ids} = user;
    content = <EditUserForm userId = {user.ids} />
  }


  return content
}

export default EditUser
