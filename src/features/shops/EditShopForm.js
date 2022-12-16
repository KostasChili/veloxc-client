import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateShopMutation, useDeleteShopMutation } from "./shopsApiSlice";

const EditShopForm = (shop) => {
  const [updateShop, { isLoading, isSuccess }] = useUpdateShopMutation();

  const [deleteShop, { isSuccess: isDelSuccess }] = useDeleteShopMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(shop.shop.title);
  const [description, setDescription] = useState(shop.shop.description);
  const [username, setUsername] = useState(shop.shop.user);
  const [tel, setTel] = useState(shop.shop.tel);
  const [email, setEmail] = useState(shop.shop.email);
  const [city, setCity] = useState(shop.shop.city);
  const [address, setAddress] = useState(shop.shop.address);
  const [shopId, setShopId] = useState(shop.shop.id);
  const [shopPublicLink, setShopPublicLink] = useState(shop.shop.publicLink);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setDescription("");
      setUsername("");
      setTel("");
      setEmail("");
      setCity("");
      setAddress("");
      setShopId("");
      setShopPublicLink("");
      navigate("/dash/shops");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const canSave = [title, description,tel,email,city,address].every(Boolean) && !isLoading;

  const onSaveShopClicked = async (e) => {
    if (canSave) {
      await updateShop({
        id: shopId,
        title,
        description,
        tel,
        email,
        city,
        address,
      });
    }
  };
  const onDeleteShopClicked = async (e) => {
    await deleteShop({ id: shopId });
  };
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const content = (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Επεξεργασία καταστήματος {shop.title}</h2>
          <div className="form__action-buttons">
            <button
              title="Save"
              onClick={onSaveShopClicked}
              disabled={!canSave}
            >
              Αποθήκευση
            </button>
            <button title="Delete" onClick={onDeleteShopClicked}>
              Διαγραφή
            </button>
          </div>
        </div>
        <label htmlFor="shop-title">Ονομασία επιχείρησης:</label>
        <input
          id="shop-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />
        <br />

        <label htmlFor="shop-description">Περιγραφή:</label>
        <textarea
          id="shop-text"
          name="text"
          value={description}
          onChange={onDescriptionChanged}
        />
        <br />
        <div>
          <div>
            <label htmlFor="shop-username">
              Ιδιοκτήτης
              <input id="shop-username" type="text" readOnly value={username} />
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
            </label>

            <label htmlFor="shop-Id">ShopId:</label>
            <input
              id="shop-Id"
              className="form__select"
              value={shopId}
              readOnly
            ></input>
            <br />
            <label htmlFor="public-link">Σύνδεσμος:</label>
            <input
              id="public-link"
              className="form__select"
              value={shopPublicLink}
              readOnly
            ></input>
            <br />
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditShopForm;
