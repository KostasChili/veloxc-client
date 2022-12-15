import { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsApiSlice";

const NewShopForm = () => {
const [addNewShop,{
    isLoading,
    isSuccess,
}]= useAddNewShopMutation();

const navigate = useNavigate();
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");

useEffect(()=>{
    if(isSuccess)
    {  
        setTitle("");
        setDescription("");
        navigate('/dash/shops')
    }
},[isSuccess,navigate]);


const onTitleChanged = (e)=> setTitle(e.target.value);
const onDescriptionChanged = (e)=> setDescription(e.target.value);


const canSave = [title,description].every(Boolean) && !isLoading;

const onSaveShopClicked = async (e)=>{
    e.preventDefault();
    if(canSave)
    {
        await addNewShop({title,description});
    }
}

    const content  = (
        <>
    
          <form onSubmit={onSaveShopClicked}>
              <h2>Δημιουργία επιχείρησης</h2>
              <div >
                <button
                  title="Save"
                  disabled={!canSave}
                  >
                    Αποθήκευση
                  </button>
              </div>
          
          <label htmlFor="title">
              Τίτλος Επιχείρησης:
          </label>
          <input
            id="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
          ></input>
          <label  htmlFor="description">
              Περιγραφή:
          </label>
          <textarea
            
            id="description"
            type="text"
            autoComplete="off"
            value={description}
            onChange={onDescriptionChanged}
          ></textarea>
          </form>
          
        </>
      )
  
        return content
    }


export default NewShopForm
