import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";




const User = ({userId}) => {
    const user = useSelector(state=>selectUserById(state,userId));
    const navigate = useNavigate();

    if(user)
    {
        const handleEdit=()=>navigate(`/dash/users/${userId}`);
        return (
            <tr >
                <td >{user.username}</td>
                <td >{user.firstname}</td>
                <td >{user.lastname}</td>
                <td >{user.email}</td>
                <td >{(user.id).substring(16,24)}</td>
                <td >**********</td>
                <td >
                    <button
                        onClick={handleEdit}
                    >
                    Επεξεργασία
                    </button>
                </td>
            </tr>
        )
    }
    else return null;

 
}

export default User
