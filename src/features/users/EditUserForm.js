import { useState,useEffect } from "react";
import { useUpdateUserMutation,useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";


const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({user}) => {
  
    const [updateUser,{
        isLoading,
        isSuccess,
    }] = useUpdateUserMutation();

    const [deleteUser,{
        isSuccess:isDelSuccess
    }] = useDeleteUserMutation();
    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [email, setEmail] = useState(user.email);


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setFirstname('');
            setLastname('');
            setEmail('');
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate]);

    const onUsernameChanged = e =>{setUsername(e.target.value)}
    const onFirstnameChanged = e =>{setFirstname(e.target.value)}
    const onLastnameChanged = e =>{setLastname(e.target.value)}
    const onPasswordChanged = e =>{setPassword(e.target.value)}
    const onEmailChanged = e =>{setEmail(e.target.value)}

    const onSaveUserClicked = async ()=>{
        if(password)
        await updateUser ({id:user.id,username,firstname,lastname,email,password});
        else{
            await updateUser ({id:user.id,username,firstname,lastname,email});
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if(password)
    {
        canSave = [validPassword,validUsername].every(Boolean) && !isLoading;
    }
    else{
        canSave =[validUsername].every(Boolean) && !isLoading;
    }

    const content = (
        <>
      <form onSubmit={onSaveUserClicked}>
        <h2>Επεξεργασία {user.username}</h2>
        
        <label htmlFor="username">Όνομα Χρήστη</label>
        <input
          id="username"
          name="username"
          value={username}
          type="text"
          autoComplete="off"
          onChange={onUsernameChanged}
        ></input>

<label htmlFor="firstname">Όνομα</label>
        <input
          id="firstname"
          name="firstname"
          value={firstname}
          type="text"
          autoComplete="off"
          onChange={onFirstnameChanged}
        ></input>

<label htmlFor="lastname">Επίθετο</label>
        <input
          id="lastname"
          name="lastname"
          value={lastname}
          type="text"
          autoComplete="off"
          onChange={onLastnameChanged}
        ></input>

        <label htmlFor="password">Κωδικός Πρόσβασης</label>
        <input
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={onPasswordChanged}
        ></input>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={email}
          type="email"
          onChange={onEmailChanged}
        ></input>
        <div>
          <button disabled={!canSave} title="Save">
            Καταχώρηση Αλλαγών
          </button>
          <button  title="Delete" onClick={onDeleteUserClicked}>
            Διαγραφή Χρήστη
          </button>
        </div>
      </form>
    </>
    )

    return content
}


export default EditUserForm
