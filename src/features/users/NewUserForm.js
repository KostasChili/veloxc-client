import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9]{4,12}$/;


const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess }] = useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUn, setValidUn] = useState(false);
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [validMail, setValidMail] = useState(false);

  useEffect(() => {
    setValidUn(USER_REGEX.test(username));
   
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
   
  }, [password]);

 

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      setFirstname("");
      setLastname("");
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onFirstnameChanged = e => setFirstname(e.target.value);
  const onLastnameChanged = e => setLastname(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);

  
  const canSave = [validPwd, validUn].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username,firstname,lastname, password, email });
    }
  };
 
 
 
  const content = (
    <>
      <form onSubmit={onSaveUserClicked}>
        <h2>Νεος Χρήστης</h2>
        <div>
          <button disabled={!canSave} title="Save">
            Εγγραφή
          </button>
        </div>
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
      </form>
    </>
  );
  return content;
};

export default NewUserForm;
