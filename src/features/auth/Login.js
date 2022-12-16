import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";

import usePersist from "../../hooks/usePersist";

const Login = () => {
  const userRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        console.log("No server Respones");
      } else if (err.status === 400) {
        console.log("Missing username or password");
      } else if (err.status === 401) {
        console.log("Unauthorized");
      } else {
        console.log(err.data?.message);
      }
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

  const content = (
    <section>
      <header>
        <h1>Σύνδεση Συνεργάτη</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Όνομα Χρήστη</label>
          <input
            id="username"
            type="text"
            ref={userRef}
            value={username}
            autoComplete="off"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label htmlFor="password">Κωδικός Χρήστη</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button>Σύνδεση</button>

          <label htmlFor="persist">
            <input
              id="persist"
              type="checkbox"
              onChange={handleToggle}
              check={persist}
              checked={persist}
            />
            Κράτησε με Συνδεδεμένο
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Αρχική Σελίδα</Link>
      </footer>
    </section>
  );

  return content;
};

export default Login;
