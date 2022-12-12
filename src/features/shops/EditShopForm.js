import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateShopMutation,useDeleteShopMutation } from "./shopsApiSlice";

const EditShopForm = (shop) => {
    const [updateShop,{
        isLoading,
        isSuccess,
       
    }] = useUpdateShopMutation();

    const [deleteShop,{
        isSuccess:isDelSuccess,
        
    
      }] =useDeleteShopMutation();

      const navigate = useNavigate();

      const [title,setTitle] = useState(shop.shop.title);
      const [description,setDescription] = useState(shop.shop.description);
      const [username,setUsername] = useState(shop.shop.username);
      const [shopId,setShopId] = useState(shop.shop.id);



      useEffect(()=>{
        if(isSuccess || isDelSuccess)
        {
            setTitle("");
            setDescription("");
            setUsername("");
            setShopId("");
            navigate('/dash/shops');
        }
      },[isSuccess,isDelSuccess,navigate]);

      const canSave = [title,description].every(Boolean) && !isLoading;

    

      const onSaveShopClicked = async(e)=>{
          if(canSave)
          {
            await updateShop({id:shopId,title,description})
          }
      }
      const onDeleteShopClicked = async (e)=>{
            await deleteShop({id:shopId})
      }
      const onTitleChanged = (e)=>{
        setTitle(e.target.value);
      }
      const onDescriptionChanged = (e)=>{
        setDescription(e.target.value);
      }


 const content = (
    <>

    <form  onSubmit={e => e.preventDefault()}>
        <div >
            <h2>Επεξεργασία καταστήματος {shop.title}</h2>
            <div className="form__action-buttons">
                <button
                    
                    title="Save"
                    onClick={onSaveShopClicked}
                    disabled={!canSave}
                >
                    Αποθήκευση 
                </button>
                <button
                    title="Delete"
                    onClick={onDeleteShopClicked}
                >
                    Διαγραφή
                </button>
            </div>
        </div>
        <label  htmlFor="shop-title">
            Ονομασία επιχείρησης:</label>
        <input
            id="shop-title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
        />

        <label  htmlFor="shop-description">
            Περιγραφή:</label>
        <textarea
            id="shop-text"
            name="text"
            value={description}
            onChange={onDescriptionChanged}
        />
        <div >
            <div>
                <label  htmlFor="shop-username">
                    Ιδιοκτήτης
                    <input
                        id="shop-username"
                        type="text"
                        readOnly
                        value={username}
                    />
                </label>

                <label  htmlFor="shop-Id">
                    ShopId:</label>
                <input
                    id="shop-Id"
                    className="form__select"
                    value={shopId}
                    readOnly
                >
                </input>
            </div>
        </div>
    </form>
</>

  )

return content
}

export default EditShopForm
