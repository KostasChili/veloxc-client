import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectShopsById } from "./shopsApiSlice";
import { useState } from "react";
import { IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { Edit, Event } from "@mui/icons-material";

const Shop = ({ shopId }) => {
  const shop = useSelector((state) => selectShopsById(state, shopId));
  const navigate = useNavigate();
  const [descriptionState, setDescriptionState] = useState(false);

  if (shop) {
    const user = shop?.shopkeeper;
    const title = shop?.title;
    const email = shop?.email;
    const tel = shop?.tel;
    const city = shop?.city;
    const address = shop?.address;

    const handleDescription = () => {
      setDescriptionState(!descriptionState);
    };
    const description = descriptionState
      ? shop?.description
      : shop?.description.substring(0, 20);
    const handleEdit = () => navigate(`/dash/shops/${shopId}`);
    const handleShopHomePage = () => navigate(`${shopId}/appointments`);
    return (
      <TableRow>
        <TableCell align="center">{user}</TableCell>
        <TableCell align="center">{title}</TableCell>
        <TableCell align="center">
          {description}
          <button onClick={handleDescription}>+</button>
        </TableCell>
        <TableCell align="center">{email}</TableCell>
        <TableCell align="center">{tel}</TableCell>
        <TableCell align="center">
          {city} ,{address}
        </TableCell>
        <TableCell align="center">
          <Stack direction="row">
            <IconButton href={`/dash/shops/${shopId}`} >
              <Edit />
            </IconButton>
            <IconButton href={`/dash/shops/${shopId}/appointments`}>
              <Event />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  } else return null;
};

export default Shop;
