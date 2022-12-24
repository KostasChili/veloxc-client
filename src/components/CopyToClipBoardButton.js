import { Button,Snackbar ,Typography} from "@mui/material";
import { useState } from "react";

const CopyToClipBoardButton = ()=>{
    const [open,setOpen] =useState(false);
    const handleClick = ()=> {
      setOpen(true)
      navigator.clipboard.writeText(window.location)

    }
    return (
     <>
      <Button onClick={handleClick}><Typography variant="caption">Αντιγραφή</Typography></Button>
      <Snackbar
      open={open}
      onClose={()=>setOpen(false)}
      autoHideDuration={2000}
      message='Αντιγράφικε στο πρόχειρο'
      />
      </>
    )
  }

  export default CopyToClipBoardButton;