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
        <Link to="/dash/shops">Οι επιχειρήσεις μου</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
