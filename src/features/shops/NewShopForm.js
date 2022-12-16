import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsApiSlice";

const NewShopForm = () => {
  const [addNewShop, { isLoading, isSuccess }] = useAddNewShopMutation();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setTel("");
      setEmail("");
      setCity("");
      setAddress("");
      navigate("/dash/shops");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const canSave = [title, description,tel,email,city,address].every(Boolean) && !isLoading;

  const onSaveShopClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewShop({ title, description, tel, email, city, address });
    }
  };

  const content = (
    <>
      <form onSubmit={onSaveShopClicked}>
        <h2>Δημιουργία επιχείρησης</h2>

        <label htmlFor="title">Τίτλος Επιχείρησης:</label>
        <input
          id="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <br />
        <label htmlFor="description">Περιγραφή:</label>
        <textarea
          id="description"
          type="text"
          autoComplete="off"
          value={description}
          onChange={onDescriptionChanged}
        ></textarea>
        <br />

        <label htmlFor="email">Email Επιχείρησης:</label>
        <input
          id="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br />

        <label htmlFor="tel">Τηλέφωνο Επικοινωνίας:</label>
        <input
          id="tel"
          type="text"
          autoComplete="off"
          value={tel}
          onChange={(e) => {
            setTel(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="city">Πόλη:</label>
        <input
          id="city"
          type="text"
          autoComplete="off"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        ></input>
        <br />
        <label htmlFor="address">Διεύθυνση:</label>
        <input
          id="address"
          type="text"
          autoComplete="off"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <br />
        <div>
          <button title="Save" disabled={!canSave}>
            Αποθήκευση
          </button>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewShopForm;
