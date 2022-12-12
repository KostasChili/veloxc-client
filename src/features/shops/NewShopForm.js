import { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useAddNewShopMutation } from "./shopsApiSlice";

const NewShopForm = () => {
const [addNewShop,{
    isLoading,
    isSuccess,
}]= useAddNewShopMutation();

const navigate = useNavigate();
const [user,setUser] = useState(""); // to be replaced with loggin user
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");

useEffect(()=>{
    if(isSuccess)
    {   setUser("");
        setTitle("");
        setDescription("");
        navigate('/dash/shops')
    }
},[isSuccess,navigate]);

const onUserChanged = (e)=> setUser(e.target.value);
const onTitleChanged = (e)=> setTitle(e.target.value);
const onDescriptionChanged = (e)=> setDescription(e.target.value);


const canSave = [title,description,user].every(Boolean) && !isLoading;

const onSaveShopClicked = async (e)=>{
    e.preventDefault();
    if(canSave)
    {
        await addNewShop({user,title,description});
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
          <label htmlFor="username">
              Όνομα Καταστηματάρχη
          </label>
          <input
            className="form__select"
            id="username"
            name="user"
            value={user}
            onChange={onUserChanged}
          >
          </input>
          </form>
          
        </>
      )
  
        return content
    }


export default NewShopForm
