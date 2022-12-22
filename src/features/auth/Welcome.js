import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("el-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);

  return (
    <Stack spacing ={3}>
      <Typography>{today}</Typography>
      <Typography variant="h4">Καλώς Ήρθες !</Typography>
      <Stack spacing={2} direction={{xs:'column',sm:'row'}}>
        <Button variant="contained" href="/dash/shops">
          Οι επιχειρησεις μου
        </Button>
        <Button variant="contained" href="/dash/users/id">
          Το προφιλ μου
        </Button>
        <Button variant="contained" href="/dash/shops/new">
          Καταχωρηση επιχειρησης
        </Button>
      </Stack>
    </Stack>
  );
};

export default Welcome;
