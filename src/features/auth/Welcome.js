import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("el-GB", {
    dateStyle: "full",
    imeStyle: "long",
  }).format(date);

  const content = (
    <section >
      <p>{today}</p>
      <h1>Καλώς Ήρθες !</h1>
      <p>
        <button><Link to="/dash/shops">Οι επιχειρήσεις μου</Link></button>
       <button> <Link to='/dash/users/id'>Το προφίλ μου</Link></button>
        <button><Link to='/dash/shops/new'>Καταχώρηση επιχείρησης</Link></button>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
